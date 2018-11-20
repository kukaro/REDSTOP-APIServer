var express = require('express');
var router = express.Router();
var fs = require('fs');

// file
router.get('/', function (req, res) {
    let contents = '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<jmeterTestPlan version="1.2" properties="4.0" jmeter="4.0 r1823414">\n' +
        '  <hashTree>\n' +
        '    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Test Plan" enabled="true">\n' +
        '      <stringProp name="TestPlan.comments"></stringProp>\n' +
        '      <boolProp name="TestPlan.functional_mode">false</boolProp>\n' +
        '      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>\n' +
        '      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>\n' +
        '      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">\n' +
        '        <collectionProp name="Arguments.arguments"/>\n' +
        '      </elementProp>\n' +
        '      <stringProp name="TestPlan.user_define_classpath"></stringProp>\n' +
        '    </TestPlan>\n' +
        '    <hashTree>\n' +
        '      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">\n' +
        '        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>\n' +
        '        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">\n' +
        '          <boolProp name="LoopController.continue_forever">false</boolProp>\n' +
        '          <stringProp name="LoopController.loops">1</stringProp>\n' +
        '        </elementProp>\n' +
        '        <stringProp name="ThreadGroup.num_threads">1</stringProp>\n' +
        '        <stringProp name="ThreadGroup.ramp_time">1</stringProp>\n' +
        '        <boolProp name="ThreadGroup.scheduler">false</boolProp>\n' +
        '        <stringProp name="ThreadGroup.duration"></stringProp>\n' +
        '        <stringProp name="ThreadGroup.delay"></stringProp>\n' +
        '      </ThreadGroup>\n' +
        '      <hashTree>\n' +
        '        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="HTTP Request" enabled="true">\n' +
        '          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">\n' +
        '            <collectionProp name="Arguments.arguments"/>\n' +
        '          </elementProp>\n' +
        '          <stringProp name="HTTPSampler.domain"></stringProp>\n' +
        '          <stringProp name="HTTPSampler.port"></stringProp>\n' +
        '          <stringProp name="HTTPSampler.protocol"></stringProp>\n' +
        '          <stringProp name="HTTPSampler.contentEncoding"></stringProp>\n' +
        '          <stringProp name="HTTPSampler.path">http://localhost:3000</stringProp>\n' +
        '          <stringProp name="HTTPSampler.method">GET</stringProp>\n' +
        '          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>\n' +
        '          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>\n' +
        '          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>\n' +
        '          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>\n' +
        '          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>\n' +
        '          <stringProp name="HTTPSampler.connect_timeout"></stringProp>\n' +
        '          <stringProp name="HTTPSampler.response_timeout"></stringProp>\n' +
        '        </HTTPSamplerProxy>\n' +
        '        <hashTree/>\n' +
        '      </hashTree>\n' +
        '    </hashTree>\n' +
        '  </hashTree>\n' +
        '</jmeterTestPlan>';
    // fs.appendFile('/default2.jmx', contents, function (err) {
    //     if (err){
    //         res.status(500).send({
    //             success: false
    //         })
    //     }
    //     res.status(201).send({
    //         success: true
    //     })
    // });

    fs.writeFile('default2.jmx', contents, function (err) {
            if (err){
                res.status(500).send({
                    success: false
                });
            }
            res.status(201).send({
                success: true
            });
    });

});

module.exports = router;

