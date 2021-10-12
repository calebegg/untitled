//@ts-ignore
import { visuals } from "./style.module.css";

console.log(visuals);

export function ShaderCanvas() {
  return <canvas className={visuals} />;
}
