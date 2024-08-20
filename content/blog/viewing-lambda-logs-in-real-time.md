---
title: Viewing Lambda Logs In Real Time (kinda)
category: AWS
description:
  View Lambda log stream events from the comfort of your terminal of choice
  using the AWS CLI tail function.
draft: false
image: /content/lambda.png
tags:
  - logs
  - aws
  - lambda
---

Browsing to your AWS account console can be a bit of a tedious task when you
just want to examine service logs. Even when using Firefox containers to ease
the headache of dealing with multiple accounts it just takes a portion of time.
This gets even more cumbersome when you factor in the fact that Lambda functions
create log streams for each cluster of log events over time.

## AWS CLI Tail

AWS CLI tail function to the rescue! You can view the
[full documentation here](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/logs/tail.html).

AWS tail function works similar to the familiar Bash tail command (in terms of
output functionality at least, complex underlying mechanics aside).

All it needs to function is a log group name (and valid AWS credentials
configured of course 😉).

```shell
$ aws logs tail /aws/lambda/MyLambdaFunction
2023-04-23T16:17:49.224000+00:00 2023/04/23/[$LATEST]6823287090b946d394dbdc99b48ea434 START RequestId:
...
...
```

You will notice that all the time windowed log streams are aggregated using this
function, compared to the console dashboard you will have to either create a log
query or navigate in and out of different log streams to find your treasure.
This is fine if you have done it a few times and are comfortable with clicking
through the dashboard to achieve this but it can feel counter intuitive to well
known basics when doing similar hunting with logical log files on a host.

## Follow Logs

The above is just a time bound subset of the latest logs. Let's say we are
testing some integrations between development servers or using our Lambda
function as the backend for an API. For example we may have some frontend making
requests to the API.

We can add the `--follow` argument to watch all logs as they are streamed to
CloudWatch from the Lambda function.

```shell
aws logs tail /aws/lambda/MyLambdaFunction --follow
```

If you find the log output a bit too verbose (it will contain the name of the
log stream which can be lengthy) we can reduce the verbosity slightly by adding
the `--format short` argument.

```shell
aws logs tail /aws/lambda/MyLambdaFunction --follow --format short
```

If we want to filter particular log events we can also use the
`--filter-pattern` argument. Let's say we know an exception has occurred and we
want to drill into that specific event.

```shell
aws logs tail /aws/lambda/MyLambdaFunction --follow --format short \
    --filter-pattern "Exception"
```

We can compound this further by looking further back into time if required. We
can use the `--since` argument with appropriate value. For example, if we want
to see all logs for the current day.

```shell
aws logs tail /aws/lambda/MyLambdaFunction --follow --format short --since "1d"
```

As per AWS documentation:

> By default, logs will be displayed starting from ten minutes in the past

Or from the past 2 hours.

```shell
aws logs tail /aws/lambda/MyLambdaFunction --follow --format short --since "2h"
```

## Advanced Filtering

More advanced filtering can be applied to `--filter-pattern` using the filter
API.

For example, if you only want to view `[ERROR]` events.

```shell
aws logs tail "/aws/lambda/MyLambdaFunction" --filter-pattern "ERROR"
```

Happy logging! 🙂
