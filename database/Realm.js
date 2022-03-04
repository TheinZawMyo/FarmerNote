export const WorkSchema = {
  name: 'Works',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    name: 'string',
    worker: 'string',
    cost: 'string',
    created_date: {type: 'date'},
  },
};

export const LandSchema = {
  name: 'Lands',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    location: 'string',
    created_year: 'int',
    created_date: {type: 'date'},
    works: {type: 'list', objectType: 'Works'},
  },
};
