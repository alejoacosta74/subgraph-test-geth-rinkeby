// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewPerson extends ethereum.Event {
  get params(): NewPerson__Params {
    return new NewPerson__Params(this);
  }
}

export class NewPerson__Params {
  _event: NewPerson;

  constructor(event: NewPerson) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get displayName(): string {
    return this._event.parameters[2].value.toString();
  }

  get imageUrl(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class UpdatedPerson extends ethereum.Event {
  get params(): UpdatedPerson__Params {
    return new UpdatedPerson__Params(this);
  }
}

export class UpdatedPerson__Params {
  _event: UpdatedPerson;

  constructor(event: UpdatedPerson) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get owner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get displayName(): string {
    return this._event.parameters[2].value.toString();
  }

  get imageUrl(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class PersonRegistry__peopleResult {
  value0: Address;
  value1: string;
  value2: string;

  constructor(value0: Address, value1: string, value2: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    return map;
  }
}

export class PersonRegistry__getPersonResult {
  value0: string;
  value1: string;

  constructor(value0: string, value1: string) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    return map;
  }
}

export class PersonRegistry extends ethereum.SmartContract {
  static bind(address: Address): PersonRegistry {
    return new PersonRegistry("PersonRegistry", address);
  }

  ownerToPerson(param0: Address): BigInt {
    let result = super.call(
      "ownerToPerson",
      "ownerToPerson(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return result[0].toBigInt();
  }

  try_ownerToPerson(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "ownerToPerson",
      "ownerToPerson(address):(uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  people(param0: BigInt): PersonRegistry__peopleResult {
    let result = super.call(
      "people",
      "people(uint256):(address,string,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new PersonRegistry__peopleResult(
      result[0].toAddress(),
      result[1].toString(),
      result[2].toString()
    );
  }

  try_people(
    param0: BigInt
  ): ethereum.CallResult<PersonRegistry__peopleResult> {
    let result = super.tryCall(
      "people",
      "people(uint256):(address,string,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PersonRegistry__peopleResult(
        value[0].toAddress(),
        value[1].toString(),
        value[2].toString()
      )
    );
  }

  personToOwner(param0: BigInt): Address {
    let result = super.call(
      "personToOwner",
      "personToOwner(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_personToOwner(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "personToOwner",
      "personToOwner(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getPerson(owner: Address): PersonRegistry__getPersonResult {
    let result = super.call("getPerson", "getPerson(address):(string,string)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return new PersonRegistry__getPersonResult(
      result[0].toString(),
      result[1].toString()
    );
  }

  try_getPerson(
    owner: Address
  ): ethereum.CallResult<PersonRegistry__getPersonResult> {
    let result = super.tryCall(
      "getPerson",
      "getPerson(address):(string,string)",
      [ethereum.Value.fromAddress(owner)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new PersonRegistry__getPersonResult(
        value[0].toString(),
        value[1].toString()
      )
    );
  }
}

export class CreatePersonCall extends ethereum.Call {
  get inputs(): CreatePersonCall__Inputs {
    return new CreatePersonCall__Inputs(this);
  }

  get outputs(): CreatePersonCall__Outputs {
    return new CreatePersonCall__Outputs(this);
  }
}

export class CreatePersonCall__Inputs {
  _call: CreatePersonCall;

  constructor(call: CreatePersonCall) {
    this._call = call;
  }

  get _displayName(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _imageUrl(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreatePersonCall__Outputs {
  _call: CreatePersonCall;

  constructor(call: CreatePersonCall) {
    this._call = call;
  }
}

export class UpdatePersonNameCall extends ethereum.Call {
  get inputs(): UpdatePersonNameCall__Inputs {
    return new UpdatePersonNameCall__Inputs(this);
  }

  get outputs(): UpdatePersonNameCall__Outputs {
    return new UpdatePersonNameCall__Outputs(this);
  }
}

export class UpdatePersonNameCall__Inputs {
  _call: UpdatePersonNameCall;

  constructor(call: UpdatePersonNameCall) {
    this._call = call;
  }

  get _displayName(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class UpdatePersonNameCall__Outputs {
  _call: UpdatePersonNameCall;

  constructor(call: UpdatePersonNameCall) {
    this._call = call;
  }
}

export class UpdatePersonImageCall extends ethereum.Call {
  get inputs(): UpdatePersonImageCall__Inputs {
    return new UpdatePersonImageCall__Inputs(this);
  }

  get outputs(): UpdatePersonImageCall__Outputs {
    return new UpdatePersonImageCall__Outputs(this);
  }
}

export class UpdatePersonImageCall__Inputs {
  _call: UpdatePersonImageCall;

  constructor(call: UpdatePersonImageCall) {
    this._call = call;
  }

  get _imageUrl(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class UpdatePersonImageCall__Outputs {
  _call: UpdatePersonImageCall;

  constructor(call: UpdatePersonImageCall) {
    this._call = call;
  }
}
