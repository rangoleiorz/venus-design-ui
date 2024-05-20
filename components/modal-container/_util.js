const KeyGen = (function* (id) {
  while (true) {
    yield `modal-key-${id}`;
    id += 1;
  }
})(1);

export function getKey() {
  return KeyGen.next().value;
}
