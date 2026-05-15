export interface InfraConfig {
  readonly domainName: string;
  readonly hostedZoneName: string;
}

const config: InfraConfig = {
  domainName: process.env.DOMAIN_NAME ?? "charleybyrne.com",
  hostedZoneName: process.env.HOSTED_ZONE_NAME ?? "charleybyrne.com",
};

export default config;
