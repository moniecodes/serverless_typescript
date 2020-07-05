/*
 *   Copyright (c) 2020 System, Inc
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

'use strict';

var global = { "CONTEXT": undefined }

let clearAll = () => global.CONTEXT = undefined;

let replaceAllWith = ctx => global.CONTEXT = ctx;

let set = (key, value) => {
  if (!key.startsWith("x-correlation-")) {
    key = "x-correlation-" + key;
  }

  if (!global.CONTEXT) {
    global.CONTEXT = {};
  }

  global.CONTEXT[key] = value;
};

let get = () => global.CONTEXT || {};

module.exports = {
  clearAll: clearAll,
  replaceAllWith: replaceAllWith,
  set: set,
  get: get
};