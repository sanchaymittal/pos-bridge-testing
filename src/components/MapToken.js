function MapToken() {
  <div className="row-md-6">
    <div className="card">
      <h2>Map Token</h2>
      <p>ps: Only permissioned address can map token</p>
      <input
        type="string"
        name="rootToken"
        id="rootToken"
        placeholder="Root Token Address"
        value={rootToken}
        onChange={(e) => setRootToken(e.target.value)}
      />
      <input
        type="string"
        name="childToken"
        id="childToken"
        placeholder="Child Token Address"
        value={childToken}
        onChange={(e) => setChildToken(e.target.value)}
      />
      <p> map from Root to Matic | map from Matic to Root</p>
      <button onClick={() => mapTokenRootChain(rootToken, childToken)}>
        Map Token(on Ropsten)
      </button>
      <button onClick={() => mapTokenChildChain(rootToken, childToken)}>
        Map Token(on Matic)
      </button>
      <p>Check for Successful Mapping</p>
      <button onClick={() => checkMapToken(rootToken, childToken)}>
        Check Mapping
      </button>
    </div>
  </div>;
}
