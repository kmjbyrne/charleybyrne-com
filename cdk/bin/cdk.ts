#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core'
import { CertificateStack } from '../lib/certificate-stack'
import { SiteStack } from '../lib/site-stack'
import config from '../config'

const app = new cdk.App()

const account = process.env.CDK_DEFAULT_ACCOUNT

// ACM certificate must be in us-east-1 for CloudFront.
const certStack = new CertificateStack(app, 'CharleyByrneCertificateStack', {
  env: { account, region: 'us-east-1' },
  config,
  description: 'charleybyrne.com — ACM certificate',
  crossRegionReferences: true,
})

// Everything else — S3, CloudFront, Route 53 — in eu-west-1.
new SiteStack(app, 'CharleyByrneSiteStack', {
  env: { account, region: 'eu-west-1' },
  config,
  cert: certStack.cert,
  description: 'charleybyrne.com — S3 bucket, CloudFront distribution, and Route 53 alias',
  crossRegionReferences: true,
})
