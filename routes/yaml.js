
const express = require('express');
const router = express();

router.get('/yaml', (req, res) => {
    res.status(200).json({ 
        status: 200, 
        workloadName: "grafana",
        openebsEngine:"cstor",
        nameSpaceyaml: "https://github.com/openebs/e2e-infrastructure/blob/4c5c1761d8b710d16d755aece92eb2539eed73d6/production/grafana-cstor/grafana-cstor-namespace.yaml",
        workloadyaml:"https://github.com/openebs/e2e-infrastructure/blob/4c5c1761d8b710d16d755aece92eb2539eed73d6/production/grafana-cstor/grafana-cstor-deployment.yaml"
 });
});



module.exports = router;