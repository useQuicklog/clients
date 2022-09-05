<div align="center">
  <img src="https://quicklog.io/quicklog-avatar.png" alt="Quicklog" width="300px"/>
  <h1>Quicklog</h1>
  <h4>This is the official client library for Quicklog.io</h4>
	<a href="https://discord.gg/JWunpamH"><img src="https://img.shields.io/discord/1013916244367380500?color=%237289DA&label=Discord" alt="Discord" />
</div>

## What's inside?

This library is bundled with Turborepo and provides the following libraries to use with Quicklog:
- Node
- ~~React~~ <sup>Currently on roadmap, not released yet</sup>
- ~~Vue~~ <sup>Currently on roadmap, not released yet</sup>

## Installation

```sh
npm install --save @usequicklog/clients
```

## Usage

### Node

#### Import
```ts
import { createClient } from '@usequicklog/clients';
```

#### Initialize
```ts
const ql = createClient({ 
  token: 'your-token',
  project: 'your-project'
});
```

#### Send event
```ts
ql.event({
  icon: '✨',
  channel: 'my-channel',
  event: 'New user',
  message: 'New user just signed up!'
})
```
