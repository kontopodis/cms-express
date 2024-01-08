import NodeCache from  "node-cache" 
const userCache = new NodeCache( { stdTTL: 60*60, checkperiod: 60*60 } );
export default userCache