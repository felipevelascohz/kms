#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Kms } from '../src/kms';

const iniciativa :string = 'IdSbxFelipeVelasco';
const provider = {
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
};

const app = new cdk.App();

const stack = new cdk.Stack(app, iniciativa, {
  env: provider,
})

new Kms(stack, "Key", {})

app.synth();
