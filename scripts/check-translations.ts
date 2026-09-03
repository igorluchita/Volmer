import ro from '../src/messages/ro.json';
import ru from '../src/messages/ru.json';
function flatten(value:unknown,path=''):string[]{if(Array.isArray(value))return value.flatMap((x,i)=>flatten(x,`${path}.${i}`));if(value&&typeof value==='object')return Object.entries(value).flatMap(([key,entry])=>flatten(entry,path?`${path}.${key}`:key));return [path];}
const roKeys=flatten(ro).sort();const ruKeys=flatten(ru).sort();const differences={missing:roKeys.filter(key=>!ruKeys.includes(key)),extra:ruKeys.filter(key=>!roKeys.includes(key))};if(differences.missing.length||differences.extra.length){console.error(differences);process.exit(1);}console.log(`Translation parity verified across RO and RU: ${roKeys.length} keys.`);
