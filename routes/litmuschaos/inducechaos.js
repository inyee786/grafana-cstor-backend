const express = require("express");
const router = express();
const killTarget = require("./killtarget");
const networkDelay = require("./targetnetworkdelay");

const Client = require('kubernetes-client').Client;
const config = require('kubernetes-client').config;
// const client = new Client({ config: config.getInCluster() });
// await client.loadSpec();
//Entrypoint main
function initJob(app) {
  createJob(app, config, Client);
}

async function createJob(deploymentManifest, config, Client) {
  try {
    const client = new Client({ config: config.getInCluster() });
    await client.loadSpec();
    // const client = new Client({ config: config.fromKubeconfig(), version: '1.9' });

    const create = await client.apis.batch.v1
      .namespaces("litmus")
      .jobs.post({ body: deploymentManifest });
    console.log("Result: ", create);
  } catch (err) {
    console.error("Error: ", err);
  }
}

router.get("/", (req, res) => {
  console.log("hitting the api /k8s/mongo")
  var app = req.query.app;
  console.log(app)
  var type = req.query.type;
  console.log(req.query)
  console.log(type);
  if (type == '0') {
    r = initJob(killTarget(app));
  }
  else if (type == "1") {
    r = initJob(networkDelay(app));
  }
  res.status(200).json();
});

module.exports = router;
