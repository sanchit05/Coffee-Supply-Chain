import FabricCAServices from "fabric-ca-client";

const buildCAClient = (
  ccp: Record<string, any>,
  caHostName: string
): FabricCAServices => {
  const caInfo = ccp.certificateAuthorities[caHostName];
  const caTLSCACerts = caInfo.tlsCACerts.pem;

  return new FabricCAServices(
    caInfo.url,
    { trustedRoots: caTLSCACerts, verify: false },
    caInfo.caName
  );
};

export { buildCAClient };
