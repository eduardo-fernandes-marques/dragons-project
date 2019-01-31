export class ResponseModel {
    n: number;
    nModified: number;
    opTime: OpTime;
    electionId: string;
    ok: number;
    operationTime: string;
    $clusterTime: $ClusterTime;
}

class OpTime {
  ts: string;
  t: number;
}

class $ClusterTime {
  clusterTime: string;
  signature: Signature;
}

class Signature {
  hash: string;
  keyId: string;
}
