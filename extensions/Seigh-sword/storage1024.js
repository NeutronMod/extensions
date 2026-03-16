// Name: Storage1024
// ID: s1024
// Description: Ultra-secure cloud storage and global variable syncing for your project. Secure, fast, and unified.
// By: Seigh-sword! <https://github.com/Seigh-sword/>
// License: MPL-2.0
// Version V.1.0.0

(function(Scratch) {
  'use strict';

  const icon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNjAwIDMwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzMzMzsgc3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMDAwOyBzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2cpIi8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjI4LCA0MCkgc2NhbGUoNikiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTEyIDJsOSA0LjlWMTdMMTIgMjJsLTktNC45Vjd6Ii8+PHBhdGggZD0iTTEyIDIyVjEyIi8+PHBhdGggZD0iTTIxIDdsLTkgNS05LTUiLz48cGF0aCBkPSJNMTIgMTJsOS01Ii8+PHBhdGggZD0iTTEyIDEyTDMgNyIvPjwvZz48dGV4dCB4PSIzMDAiIHk9IjI0NSIgZm9udC1mYW1pbHk9Ik91dGZpdCwgQXJpYWwiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LXNpemU9IjM2IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+U1RPUkFHRTEwMjQ8L3RleHQ+PHRleHQgeD0iNTg1IiB5PSIyODUi font-family="Outfit, Arial" font-size="14" fill="rgba(255,255,255,0.5)" text-anchor="end">- seigh_sword</text></svg>';

  class Storage1024 {
    constructor() {
      this.token = '';
      this.userID = '';
      this.apiBase = 'https://storage1024.onrender.com/api';
    }

    getInfo() {
      return {
        id: 's1024',
        name: 'Storage1024',
        blockIconURI: icon,
        color1: '#333333',
        color2: '#222222',
        blocks: [
          {
            opcode: 'setConfigs',
            blockType: Scratch.BlockType.COMMAND,
            text: 'setup Storage1024 ID [ID] token [TOKEN]',
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'project_id' },
              TOKEN: { type: Scratch.ArgumentType.STRING, defaultValue: 'token' }
            }
          },
          '---',
          {
            opcode: 'getVar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get global variable [NAME]',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'my_var' }
            }
          },
          {
            opcode: 'setVar',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set global variable [NAME] to [VALUE]',
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'my_var' },
              VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello' }
            }
          },
          {
            opcode: 'listVars',
            blockType: Scratch.BlockType.REPORTER,
            text: 'list all variables (JSON)'
          }
        ]
      };
    }

    setCredentials(args) {
      this.userID = args.ID;
      this.token = args.TOKEN;
    }

    async getVar(args) {
      if (!this.token || !this.userID) return 'Error: Setup first';
      try {
        const response = await fetch(`${this.apiBase}/projects/${this.userID}/gv/${args.NAME}`, {
          headers: { 'Authorization': `Bearer ${this.token}` }
        });
        const data = await response.json();
        return data.value || '';
      } catch (e) {
        return 'Error: Fetch failed';
      }
    }

    async setVar(args) {
      if (!this.token || !this.userID) return;
      try {
        await fetch(`${this.apiBase}/projects/${this.userID}/gv`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ alias: args.NAME, value: args.VALUE })
        });
      } catch (e) {
        console.error('S1024 SetVar Error:', e);
      }
    }

    async listVars() {
      if (!this.token || !this.userID) return '{}';
      try {
        const response = await fetch(`${this.apiBase}/projects/${this.userID}/gv`, {
          headers: { 'Authorization': `Bearer ${this.token}` }
        });
        const data = await response.json();
        return JSON.stringify(data);
      } catch (e) {
        return '{}';
      }
    }
  }

  Scratch.extensions.register(new Storage1024());
})(Scratch);
