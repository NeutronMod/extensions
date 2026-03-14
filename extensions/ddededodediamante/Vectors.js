// Name: Vectors
// ID: ddeVectors
// Description: Manipulate vectors with common math operations.
// By: ddededodediamante <https://github.com/ddededodediamante/>
// License: MPL-2.0

// Version V.1.0.0

(function (Scratch) {
  "use strict";

  class Vectors {
    getInfo() {
      return {
        id: "ddeVectors",
        name: "Vectors",
        color1: "#5BB998",

        blocks: [
          {
            opcode: "vector2D",
            text: Scratch.translate("vector x [X] y [Y]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "vector3D",
            text: Scratch.translate("vector x [X] y [Y] z [Z]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "vectorFromAngle",
            text: Scratch.translate("vector from angle [A]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "dimensionsVector",
            text: Scratch.translate("vector with [N] dimensions set to [V]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
              V: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          "---",
          {
            opcode: "add",
            text: Scratch.translate("[A] + [B]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              A: { type: Scratch.ArgumentType.ARRAY },
              B: { type: Scratch.ArgumentType.ARRAY },
            },
          },
          {
            opcode: "subtract",
            text: Scratch.translate("[A] - [B]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              A: { type: Scratch.ArgumentType.ARRAY },
              B: { type: Scratch.ArgumentType.ARRAY },
            },
          },
          {
            opcode: "scale",
            text: Scratch.translate("[VEC] * [S]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              VEC: { type: Scratch.ArgumentType.ARRAY },
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            },
          },
          {
            opcode: "divide",
            text: Scratch.translate("[VEC] / [S]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              VEC: { type: Scratch.ArgumentType.ARRAY },
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            },
          },
          {
            opcode: "lerp",
            text: Scratch.translate("lerp [A] to [B] by [T]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              A: { type: Scratch.ArgumentType.ARRAY },
              B: { type: Scratch.ArgumentType.ARRAY },
              T: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5 },
            },
          },
          "---",
          {
            opcode: "magnitude",
            text: Scratch.translate("magnitude of [VEC]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              VEC: { type: Scratch.ArgumentType.ARRAY },
            },
          },
          {
            opcode: "angle",
            text: Scratch.translate("angle of [VEC]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              VEC: { type: Scratch.ArgumentType.ARRAY },
            },
          },
          {
            opcode: "normalize",
            text: Scratch.translate("normalize [VEC]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              VEC: { type: Scratch.ArgumentType.ARRAY },
            },
          },
          {
            opcode: "rotate2D",
            text: Scratch.translate("rotate [VEC] by [A] degrees"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              VEC: { type: Scratch.ArgumentType.ARRAY },
              A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 },
            },
          },
          {
            opcode: "clampMagnitude",
            text: Scratch.translate("clamp magnitude of [VEC] to [MAX]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              VEC: { type: Scratch.ArgumentType.ARRAY },
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
          },
          {
            opcode: "swizzle",
            text: Scratch.translate("swizzle [VEC] with [INDICES]"),
            blockType: Scratch.BlockType.ARRAY,
            arguments: {
              VEC: { type: Scratch.ArgumentType.ARRAY },
              INDICES: { type: Scratch.ArgumentType.ARRAY },
            },
          },
          {
            opcode: "dot",
            text: Scratch.translate("dot product of [A] and [B]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              A: { type: Scratch.ArgumentType.ARRAY },
              B: { type: Scratch.ArgumentType.ARRAY },
            },
          },
          {
            opcode: "distance",
            text: Scratch.translate("distance between [A] and [B]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              A: { type: Scratch.ArgumentType.ARRAY },
              B: { type: Scratch.ArgumentType.ARRAY },
            },
          },
          {
            opcode: "angleBetween",
            text: Scratch.translate("angle between [A] and [B]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              A: { type: Scratch.ArgumentType.ARRAY },
              B: { type: Scratch.ArgumentType.ARRAY },
            },
          },
        ],
      };
    }

    _map(a, func) {
      return Scratch.Cast.toArray(a).map((x, i) =>
        func(Scratch.Cast.toNumber(x), i)
      );
    }

    _map2(a, b, func) {
      a = Scratch.Cast.toArray(a);
      b = Scratch.Cast.toArray(b);
      const length = Math.max(a.length, b.length);
      return Array.from({ length }, (_, i) =>
        func(Scratch.Cast.toNumber(a[i] ?? 0), Scratch.Cast.toNumber(b[i] ?? 0))
      );
    }

    vector2D(args) {
      return [Scratch.Cast.toNumber(args.X), Scratch.Cast.toNumber(args.Y)];
    }

    vector3D(args) {
      return [Scratch.Cast.toNumber(args.X), Scratch.Cast.toNumber(args.Y), Scratch.Cast.toNumber(args.Z)];
    }

    vectorFromAngle(args) {
      const rad = Scratch.Cast.toNumber(args.A) * (Math.PI / 180);
      return [Math.cos(rad), Math.sin(rad)];
    }

    dimensionsVector(args) {
      const n = Math.max(0, Math.floor(Scratch.Cast.toNumber(args.N)));
      return Array(n).fill(Scratch.Cast.toNumber(args.V));
    }

    add(args) {
      return this._map2(args.A, args.B, (x, y) => x + y);
    }

    subtract(args) {
      return this._map2(args.A, args.B, (x, y) => x - y);
    }

    scale(args) {
      const s = Scratch.Cast.toNumber(args.S);
      return this._map(args.VEC, (x) => x * s);
    }

    divide(args) {
      const s = Scratch.Cast.toNumber(args.S);
      if (s === 0) return this._map(args.VEC, () => 0);
      return this._map(args.VEC, (x) => x / s);
    }

    lerp(args) {
      const t = Scratch.Cast.toNumber(args.T);
      return this._map2(args.A, args.B, (a, b) => a + (b - a) * t);
    }

    magnitude(args) {
      const v = Scratch.Cast.toArray(args.VEC);
      return Math.sqrt(
        v.reduce((acc, x) => acc + Math.pow(Scratch.Cast.toNumber(x), 2), 0)
      );
    }

    angle(args) {
      const v = Scratch.Cast.toArray(args.VEC);
      const x = Scratch.Cast.toNumber(v[0] ?? 0);
      const y = Scratch.Cast.toNumber(v[1] ?? 0);
      return Math.atan2(y, x) * (180 / Math.PI);
    }

    normalize(args) {
      const mag = this.magnitude(args);
      if (mag === 0) return this._map(args.VEC, () => 0);
      return this._map(args.VEC, (x) => x / mag);
    }

    rotate2D(args) {
      const v = Scratch.Cast.toArray(args.VEC);
      const rad = Scratch.Cast.toNumber(args.A) * (Math.PI / 180);
      const x = Scratch.Cast.toNumber(v[0] ?? 0);
      const y = Scratch.Cast.toNumber(v[1] ?? 0);
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const result = [x * cos - y * sin, x * sin + y * cos];
      for (let i = 2; i < v.length; i++)
        result.push(Scratch.Cast.toNumber(v[i]));
      return result;
    }

    clampMagnitude(args) {
      const max = Scratch.Cast.toNumber(args.MAX);
      const mag = this.magnitude(args);
      if (mag === 0 || mag <= max)
        return Scratch.Cast.toArray(args.VEC).map((x) =>
          Scratch.Cast.toNumber(x)
        );
      return this._map(args.VEC, (x) => (x / mag) * max);
    }

    swizzle(args) {
      const v = Scratch.Cast.toArray(args.VEC);
      return Scratch.Cast.toArray(args.INDICES).map(i =>
        Scratch.Cast.toNumber(v[Scratch.Cast.toNumber(i)] ?? 0)
      );
    }

    dot(args) {
      return this._map2(args.A, args.B, (x, y) => x * y).reduce(
        (acc, x) => acc + x,
        0
      );
    }

    distance(args) {
      const diff = this._map2(args.A, args.B, (x, y) => x - y);
      return Math.sqrt(diff.reduce((acc, x) => acc + x * x, 0));
    }

    angleBetween(args) {
      const magA = this.magnitude({ VEC: args.A });
      const magB = this.magnitude({ VEC: args.B });
      if (magA === 0 || magB === 0) return 0;
      const cosAngle = Math.max(
        -1,
        Math.min(1, this.dot(args) / (magA * magB))
      );
      return Math.acos(cosAngle) * (180 / Math.PI);
    }
  }

  Scratch.extensions.register(new Vectors());
})(Scratch);
