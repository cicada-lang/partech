import * as Exp from "../exp"
import { Json } from "../utils/json"

export type Metadata = {
  [key: string]: Json
}

export type Mod = {
  map: Map<string, Exp.Exp>
  metadata: Metadata
}
