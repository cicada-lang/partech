import { expect, test } from "vitest"
import * as pt from ".."
import { createParser } from "./utils"

const grammars = {
  one_or_more: pt.grammars.one_or_more,

  value: {
    $grammar: {
      "value:object": ["object"],
      "value:array": ["array"],
      "value:boolean": ["boolean"],
      "value:null": ["null"],
      "value:string": ["string"],
      "value:number": ["number"],
    },
  },

  object: {
    $grammar: {
      "object:empty": ['"{"', '"}"'],
      "object:one": ['"{"', "string", '":"', "value", '"}"'],
      "object:more": [
        '"{"',
        { $ap: ["one_or_more", "object_entry"] },
        "string",
        '":"',
        "value",
        '"}"',
      ],
    },
  },

  object_entry: {
    $grammar: {
      "object_entry:key_value_comma": ["string", '":"', "value", '","'],
    },
  },

  array: {
    $grammar: {
      "array:empty": ['"["', '"]"'],
      "array:one": ['"["', "value", '"]"'],
      "array:more": [
        '"["',
        { $ap: ["one_or_more", "array_entry"] },
        "value",
        '"]"',
      ],
    },
  },

  array_entry: {
    $grammar: {
      "array_entry:value_comma": ["value", '","'],
    },
  },

  boolean: {
    $grammar: {
      "boolean:true": ['"true"'],
      "boolean:false": ['"false"'],
    },
  },

  null: {
    $grammar: {
      "null:null": ['"null"'],
    },
  },

  string: {
    $grammar: {
      "string:string": [{ $pattern: ["string"] }],
    },
  },

  number: {
    $grammar: {
      "number:number": [{ $pattern: ["number"] }],
    },
  },
}

const parse = createParser(grammars, "value")

test("Old familiar JSON", () => {
  expect(parse("[null, null, null]"))

  expect(
    parse(`
{
  "姓": "毛",
  "名": "泽东",
  "生日": "1893-12-26",
  "母校": {
    "省": "湖南",
    "市": "长沙",
    "名": "湖南省立第一师范学校"
  },
  "身份": [
    "中国人民的领袖",
    "伟大的马克思主义者",
    "无产阶级革命家"
  ]
}
`),
  )

  expect(() => parse("- []")).toThrow()

  expect(parse("null"))
  expect(parse("[]"))
  expect(parse("{}"))
  expect(parse("-3.1415926"))
  expect(parse("3.1415926"))
  expect(parse("-666"))
  expect(parse("666"))
  expect(parse(`"A B C"`))
  expect(
    parse(`
{
  "users": [
    {"username" : "SammyShark", "location" : "Indian Ocean"},
    {"username" : "JesseOctopus", "location" : "Pacific Ocean"},
    {"username" : "DrewSquid", "location" : "Atlantic Ocean"},
    {"username" : "JamieMantisShrimp", "location" : "Pacific Ocean"}
  ]
}
`),
  )

  expect(() => parse("()")).toThrow()
  expect(() => parse("{} {}")).toThrow()
  expect(() => parse("a b c")).toThrow()

  expect(parse(`{ "firstName": "John", "lastName": "Smith" }`))

  expect(
    parse(`
{
  "first_name" : "Sammy",
  "last_name" : "Shark",
  "location" : "Ocean",
  "online" : true,
  "followers" : 987
}
`),
  )

  // missing comma
  expect(() =>
    parse(`
{
  "first_name" : "Sammy",
  "last_name" : "Shark"
  "location" : "Ocean",
  "online" : true,
  "followers" : 987
}
`),
  ).toThrow()

  expect(
    parse(`
{
  "firstName": "John",
  "lastName": "Smith",
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postalCode": 10021
  },
  "phoneNumbers": [
    "212 555-1234",
    "646 555-4567"
  ],
  "wage": 1000.5
}
`),
  )

  // NOTE extra comma
  expect(() =>
    parse(`
{
  "firstName": "John",
  "lastName": "Smith",
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postalCode": 10021
  },
  "phoneNumbers": [
    "212 555-1234",
    "646 555-4567"
  ],
  "wage": 1000.5,
}
`),
  ).toThrow()
})
