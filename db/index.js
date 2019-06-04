const fs = require('fs');
const path = require('path');
const _ = require('lodash');
let pg = require('pg');
delete pg.native;
const Sequelize = require('sequelize');

const env = 'config';

let config = require('../config/' + env + '.json').database;
if (!_.isObject(config)) {
  config = {};
}

function resetAttributes(options) {
  if (options.originalAttributes !== undefined) {
    options.attributes = options.originalAttributes;
    if (options.include) {
      options.include.forEach(resetAttributes);
    }
  }
}

// @todo does not work with sequelize > 4.32
// https://github.com/sequelize/sequelize/issues/9074
// pg.types.setTypeParser(1700, stringValue => {
//   return parseFloat(stringValue);
// });

let isMasterInited = false;
let db = new Sequelize('test','yourname', 'yourname', _.extend({}, config.options, {
  "hooks": {
    "beforeFindAfterOptions": function (options) {
      if (options.raw) {
        resetAttributes(options);
      }
    },
    "afterConnect": [
      function setParsers() {
        if (isMasterInited) {
          return;
        }

        const types = {
          DECIMAL: { ...this.Sequelize.DataTypes.postgres.DECIMAL }
        };

        types.DECIMAL.parse = parseFloat;
        this.connectionManager.refreshTypeParser(types);

        isMasterInited = true;
      }
    ]
  }
}));

let slave = null;

if (config.slave) {
  try {
    let isSlaveInited = false;
    slave = new Sequelize(config.slave.database, config.slave.username, config.slave.password, _.extend({}, config.slave.options, {
      "hooks": {
        "beforeFindAfterOptions": function (options) {
          if (options.raw) {
            resetAttributes(options);
          }
        }
      },
      "afterConnect": [
        function setParsers() {
          if (isSlaveInited) {
            return;
          }
          
          const types = {
            DECIMAL: { ...this.Sequelize.DataTypes.postgres.DECIMAL }
          };
  
          types.DECIMAL.parse = parseFloat;
          this.connectionManager.refreshTypeParser(types);
          isSlaveInited = true;
        }
      ]
    }));
  } catch (err) {
    slave = null;
  }
}

db.getBdSlave = function () {
  return slave ? slave : db;
};

let directory = path.join(__dirname, 'models');
fs.readdirSync(directory).filter(function (file) {
  return (file.indexOf('.') !== 0);
}).forEach(function (file) {
  db.import(path.join(directory, file));
  if (slave) {
    slave.import(path.join(directory, file));
  }
});

Object.keys(db.models).forEach(function (modelName) {
  if ('associate' in db.models[modelName]) {
    db.models[modelName].associate(db.models);
    if (slave) {
      slave.models[modelName].associate(slave.models);
    }
  }
});

module.exports = db;
