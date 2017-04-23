![spring-river](https://cloud.githubusercontent.com/assets/374635/25313507/34d93b0a-2873-11e7-8667-01dba6b65072.png)

<p align="center">
  <img src="https://img.shields.io/npm/v/spring-river.svg" alt="npm version">
  <img src="https://img.shields.io/npm/l/spring-river.svg" alt="npm license">
  <img src="https://img.shields.io/travis/gtramontina/spring-river.svg" alt="travis">
  <img src="https://img.shields.io/codeclimate/github/gtramontina/spring-river.svg" alt="codeclimate score">
</div>

## Disclaimer

This library is my attempt to make a javascript version of Fred George's ([@fredgeorge](https://github.com/fredgeorge)) [RapidsRivers](https://github.com/fredgeorge/rapids_rivers) following [Zeit's Micro](https://github.com/zeit/micro) simple bootstrap approach. This is just an experiment at this point.

For more information on the Rapids/Rivers/Ponds paradigm, please refer to the links at the bottom of this file.

## Usage

If you learn by looking at code first, check out `examples` directory.

Now onto the step-by-step:

First, you need to install `spring-river` as a runtime dependency:

```shell
npm install spring-river --save
```

This library requires an `amqp`-compatible queue. [RabbitMQ](https://www.rabbitmq.com/) works perfectly. In order to configure the queue address, you can either set the environment variable `ADDRESS` or add the `--address` (or `-a`) flag when starting your services and set the address as `amqp://…`.

### River

If your microservice is the one generating "solutions", add a `{"start": "river"}` script, like the following, to your `package.json`:

```json
{
  "main": "index.js",
  "name": "my-microservice-river",
  "scripts": {
    "start": "river"
  }
}
```

Your `index.js` will look like the following. It accepts a `packet`, which is, for all purposes, a plain javascript object with the packet's contents, and a `publish` function, which can be used to publish conclusions back to the rapids.

```javascript
module.exports = (packet, publish) => {
  packet.solution = 10;
  publish(packet);
};
```

To get you service running, all you need to do is to run:

```shell
npm start
```

### Spring

If your microservice is the one generating "needs", add a `{"start": "spring"}` script, like the following, to your `package.json`:

```json
{
  "main": "index.js",
  "name": "my-microservice-spring",
  "scripts": {
    "start": "spring"
  }
}
```

Your `index.js` will look like the following. It accepts a `publish` function, which can be used to publish conclusions (a need is a conclusion) to the rapids.

```javascript
module.exports = (publish) => {
  setInterval(() => {
    publish({need: 'rental_car_offer'});
  }, 5000)
};
```

To get you service running, all you need to do is to run:

```shell
npm start
```

### Predicates

By definition, your exported function will be called whenever a packet arrives (this is so we can keep the bus a dumb pipe). In order to filter out and focus only on interesting packets, you can use decorators around your to-be-exported function. E.g.:

```javascript
const myFilter = require('./my-filter');

module.exports = myFilter((packet, publish) => {
  packet.solution = 10;
  publish(packet);
});
```

Where `my-filter.js` could be something that filters only packets that have `{need: 'rental_car_offer'}`:

```javascript
module.exports = (next) => (packet, publish) => {
  if (packet.need === 'rental_car_offer') {
    next(packet, publish);
  }
}
```

This library ships with a few built-in predicates that you might find useful (perhaps these are candidates to be moved out into their own modules, as these are just very simple functions).

<details>
  <summary>`forbid-keys`: filters out packets that contain any of the given keys;
  </summary>

  > *Parameters:*
  > `(...string)`: a list of forbidden keys

</details>

<details>
  <summary>`require-keys`: filters out packets that _do not_ contain _all_ given keys;
  </summary>

  > *Parameters:*
  > `(...string)`: a list of required keys

</details>

<details>
  <summary>`require-values`: filters out packets that _do not_ contain _all_ given key-value pairs;
  </summary>

  > *Parameters:*
  > `(object)`: the object with the required key-value pairs

</details>

#### Usage

The following example is interested in packets that contain the `{need: 'rental_car_offer'}` key-value pair and does not have a `solution` key:

```javascript
const predicates = require('spring-river/predicates');
const {requireValues, forbidKeys} = predicates;

module.exports = predicates(
  requireValues({need: 'rental_car_offer'}),
  forbidKeys('solution')
)((packet, publish) => {
  packet.solution = 10;
  publish(packet);
});

```

## Credits

First and foremost, everything here is built based on Fred George's ([@fredgeorge](https://github.com/fredgeorge)) Rapids/Rivers/Ponds paradigm, so here's a list of resources if you want to get more familiar with this idea:

* https://vimeo.com/79866979
* https://youtu.be/2rKEveL55TY
* https://github.com/fredgeorge/rapids_rivers
* https://github.com/fredgeorge/microservice_workshop
* https://www.infoq.com/news/2016/02/not-just-microservices

The structure of this module was inspired by [Zeit's Micro](https://github.com/zeit/micro), so `bin/index.js` borrows a lot from it.

## License

This software is licensed under the [MIT license](http://opensource.org/licenses/MIT).

---

[![](https://codescene.io/projects/1137/status.svg)](https://codescene.io/projects/1137/jobs/latest-successful/results)
