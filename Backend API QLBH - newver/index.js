'use strict';
const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const STAFFRoutes = require('./routes/STAFFRoutes');
const ACCRoutes = require('./routes/ACCOUNTRoutes');
const PARTNERRoutes = require('./routes/PARTNERRoutes');
const RESRoutes = require('./routes/RESRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/staff', STAFFRoutes.routes);
app.use('/account', ACCRoutes.routes);
app.use('/partner', PARTNERRoutes.routes);
app.use('/restaurant', RESRoutes.routes);

app.listen(config.port, () => {
  console.log('app listening on url http://' + config.host + ':' + config.port )
});