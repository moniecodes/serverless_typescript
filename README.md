<p align="center">
    <img src="https://alpha.system.com/static/media/system-icon.8e57b820.svg" width="80"/>   
</p>

<p align="center">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/AWS_Simple_Icons_Monitoring_Amazon_CloudWatch_Alarm.svg/768px-AWS_Simple_Icons_Monitoring_Amazon_CloudWatch_Alarm.svg.png" width="40"/>  
</p>


# Monitoring

There are several components to our [EK](https://aws.amazon.com/blogs/database/ek-is-the-new-elk-simplify-log-analytics-by-transforming-data-natively-in-amazon-elasticsearch-service/) centralized monitoring and alerting stack.

<p align="center">
            <img src="https://user-images.githubusercontent.com/4549548/73893737-7a9a5000-4848-11ea-9e1d-acaa52c99d2e.png" width="500"/>  
</p>

##### 1. Cloudwatch application logs 
##### 2. Cloudtrail, X-Ray, APM, Promethues metrics
##### 3. Log and metric aggregation to ElasticSearch 
##### 4. Kibana dashboards and visualizations 
##### 5. Cloudwatch alarms

*[Cloudwatch logs](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logs:)* gather application logs and events. *[Cloudtrail](https://console.aws.amazon.com/cloudtrail/home?region=us-east-1#/dashboard), [X-Ray](https://console.aws.amazon.com/xray/home?region=us-east-1), Prometheus* are services to monitor application performance and capture metrics. 

All logs are aggregated into *[Elasticsearch](https://console.aws.amazon.com/es/home?region=us-east-1#domain:resource=es-aggregate-logging-dev;action=dashboard)* for ease of realtime search and access. *[Kibana](https://search-es-aggregate-logging-dev-iavut7huugtuajkahhyxtuvlei.us-east-1.es.amazonaws.com/_plugin/kibana/)* is an elasticsearch feature enabling us to visualize and analize our application events so we can track load, troubleshoot and monitor our entire platform. 

*[Cloudwatch alarms](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#alarmsV2:)* automate resource and latency alerts across our critical services.

## Logs

### Dashboards

#### [Production API Dashboard](https://search-es-aggregate-logging-dev-iavut7huugtuajkahhyxtuvlei.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/f1734250-4559-11ea-a261-cd30fd39cf07?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15h%2Cto%3Anow)))
#### [Development API Dashboard](https://search-es-aggregate-logging-dev-iavut7huugtuajkahhyxtuvlei.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/15a3d9b0-4937-11ea-a261-cd30fd39cf07?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15h%2Cto%3Anow)))
#### [Production Lambda Dashboard](https://search-es-aggregate-logging-dev-iavut7huugtuajkahhyxtuvlei.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/3b12d320-4632-11ea-a261-cd30fd39cf07?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15h%2Cto%3Anow)))
#### [Development Lambda Dashboard](https://search-es-aggregate-logging-dev-iavut7huugtuajkahhyxtuvlei.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/dashboard/ea1293b0-4c1d-11ea-a261-cd30fd39cf07?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1w%2Cto%3Anow)))

#### [X-RAY Dashboard](https://console.aws.amazon.com/xray/home?region=us-east-1#/service-map)


### All Events

##### [Production API Access Logs](https://search-es-aggregate-logging-dev-iavut7huugtuajkahhyxtuvlei.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/discover/3d011b30-4559-11ea-a261-cd30fd39cf07?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15h%2Cto%3Anow)))
##### [Production API Request Logs](https://search-es-aggregate-logging-dev-iavut7huugtuajkahhyxtuvlei.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/discover/3d011b30-4559-11ea-a261-cd30fd39cf07?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15h%2Cto%3Anow)))

##### [Production EKS Logs](https://search-es-aggregate-logging-dev-iavut7huugtuajkahhyxtuvlei.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/discover/1cc0e840-49c9-11ea-a261-cd30fd39cf07?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15h%2Cto%3Anow)))

##### [Development EKS Logs](https://search-es-aggregate-logging-dev-iavut7huugtuajkahhyxtuvlei.us-east-1.es.amazonaws.com/_plugin/kibana/app/kibana#/discover/1cc0e840-49c9-11ea-a261-cd30fd39cf07?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15h%2Cto%3Anow)))


## Alarms

Cloudwatch alarms are automatically generated and triggered by Deployment Events. Alarms are pushed to monitoring-dev@system.com and monitoring-prod@system.com as well Slack **#alerts** channel.

| API Gateway   |      EC2      | ElasticSearch | SNS /SQS |
| ------------- | ------------- |----------------|----------|
|[5XX / 4XX](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=ApiGateway)| [StatusCheckFailed](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=EC2) | [ClusterStatus.Red](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=ES) | [NumberOfNotificationsFailed](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=SNS)|
|[Latency](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=ApiGateway) |[Memory/CPU](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=EC2)|[ClusterIndexWritesBlocked](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=ES)| [Deadletter](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=SQS) |
|[Lambda Error](https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=Lambda) | | | |

<p align="center">
    <a href="https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#cw:dashboard=Home" target="_blank">
              <img src="https://user-images.githubusercontent.com/4549548/74049091-6ddd3f80-49a1-11ea-8e18-bc0600787288.png" width="500"/>  
    </a>
</p>


## Contributing

### Project Structure

This project is built in node / typescript and runs on AWS serverless architecture. The three applications associated with each environment are:

[Custom Application:](https://console.aws.amazon.com/lambda/home?region=us-east-1#/applications/system-monitoring-prod)
##### 1. system-monitoring
Application includes custom functions to tag new and existing log groups by environment, push log events to ES and autocreate Cloudwatch alarms by resource, triggered by Cloudtrail events.

[Third Party Application:](https://serverlessrepo.aws.amazon.com/applications/arn:aws:serverlessrepo:us-east-1:374852340823:applications~auto-subscribe-log-group-to-arn)
##### 2. system-monitoring-SubscribeCloudWatchApplication
Autosubscribes new and existing Cloudwatch Log groups to a custom Lambda function
##### 3. system-monitoring-SubscribeCloudWatchApplication-1-LambdaInvocationCustomResource
    

### Lambda Functions

There are several custom Lamda functions that rely heavily on [AWS Javascript SDK](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/) for the following Classes and Methods: [AWS.CloudWatch](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudWatch.html),
[AWS.CloudWatchLogs](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudWatchLogs.html),
[AWS.APIGateway](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/APIGateway.html),
[AWS.Lambda](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Lambda.html),
[AWS.SNS](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SNS.html),
[AWS.SQS](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SQS.html)

**NOTE:** All Lambda Alarm functions filter for resources with **-dev** and **-prod** substrings within the name. Any new applications or resources using this naming convention will be automatically included.

##### [autoCreateApiAlarms](https://github.com/SystemInternal/Monitoring/blob/master/functions/api-alarms.ts)
Creates and updates API Gateway endpoint alarms, triggered via *aws.apigateway:CreateDeployment* event
##### [autoCreateUpdateCloudwatchAlarms](https://github.com/SystemInternal/Monitoring/blob/master/functions/cloudwatch-alarms.ts)
Creates and updates Lambda/ES/SNS/SQS alarms, triggered via *aws.apigateway:CreateDeployment* event
##### [autoCreateAutoScaleAlarms](https://github.com/SystemInternal/Monitoring/blob/master/functions/cloudwatch-alarms.ts)
Creates and updates Autocalse/EC2 alarms, triggered via *aws.autoscaling:UpdateAutoScalingGroup* event
##### [autoSubscribeCloudwatchToES](https://github.com/SystemInternal/Monitoring/blob/master/functions/subscribe.ts)
Sends subscribed cloudwatch log data to ElasticSearch
##### [autoTagExistingLogGroups](https://github.com/SystemInternal/Monitoring/blob/master/functions/tag.ts)
Classifies and tags existing log groups **env=dev** or **env=prod** 
##### [autoTagNewLogGroups](https://github.com/SystemInternal/Monitoring/blob/master/functions/tag.ts)
Classifies and tags new log groups **env=dev** or **env=prod** 

### Adding Alarms

Adding a new alarm is fairly straightforward once we have defined:

1. What AWS events will trigger the creation of this alarm? Consider existing resources as well as new resources.
2. What Resource group and metric will this alarm monitor?

Available Resource Metrics: [AWS/ApiGateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-metrics-and-dimensions.html),
[AWS/Lambda](https://docs.aws.amazon.com/lambda/latest/dg/monitoring-functions-metrics.html),
[AWS/EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html#ec2-cloudwatch-metrics),
[AWS/ES](https://docs.aws.amazon.com/elasticsearch-service/latest/developerguide/cloudwatch-alarms.html),
[AWS/SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-monitoring-using-cloudwatch.html)

      
#### Example AWS/EC2 Alarm:
    
      AlarmName: `EC2 for Autoscale group[${autoscaleGroup}] :  Status Check Failed for over 1 min`,
	  MetricName: "StatusCheckFailed",
	  Dimensions: [
	    { Name: 'AutoScalingGroupName', Value: autoscaleGroup }
	  ],
	  Namespace: 'AWS/ES',
	  ComparisonOperator: 'GreaterThanOrEqualToThreshold',
	  Period: 300,
	  Threshold: 1,
	  EvaluationPeriods: 2,
	  DatapointsToAlarm: 2, // 1  mins to trigger alarm
	  Statistic: 'Maximum',
	  ActionsEnabled: true,
	  AlarmActions: alarmActions,
	  AlarmDescription: `auto-generated by Lambda [${process.env.AWS_LAMBDA_FUNCTION_NAME}]`,
	  OKActions: okAction,
	  TreatMissingData: "notBreaching",
	  Unit: 'Milliseconds'

#### Adding an alarm series to the main alarm function
      
      // Run these asynchronously 
	  const lambdaPromise = lambdaAlarms.createAlarms()
	  const esPromise = esAlarms.createAlarms()
	  const snsPromise = snsAlarms.createAlarms()
	  const queuePromise = queueAlarms.createAlarms()

	  await lambdaPromise
	  await esPromise
	  await snsPromise
	  await queuePromise



