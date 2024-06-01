class NodeLinkedList {
  public value: number;
  public next: NodeLinkedList | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

interface ILinkedListTypescript {
  push(value: number): LinkedListTypescript;
  pop(): NodeLinkedList | undefined;
  unshift(value: number): LinkedListTypescript;
  shift(): NodeLinkedList | undefined;
  get(index: number): NodeLinkedList | undefined;
  set(index: number, value: number): boolean;
  insert(
    index: number,
    value: number
  ): LinkedListTypescript | boolean | undefined;
  remove(index: number): NodeLinkedList | undefined;
  reverse(): LinkedListTypescript;
}

class LinkedListTypescript implements ILinkedListTypescript {
  private head: NodeLinkedList | null = null;
  private tail: NodeLinkedList | null = null;
  public length: number;

  constructor(value: number) {
    const newNode = new NodeLinkedList(value);
    this.head = newNode;
    this.tail = this.head;

    this.length++;
  }

  push(value: number) {
    const newNode = new NodeLinkedList(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else if (this.tail) {
      this.tail.next = newNode;
    }

    this.length++;

    return this;
  }

  pop() {
    if (!this.head) return undefined;

    let temp = this.head;
    let pre = this.head;

    while (temp.next) {
      pre = temp;
      temp = temp.next;
    }

    this.tail = pre;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return temp;
  }

  unshift(value: number) {
    const newNode = new NodeLinkedList(value);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;

    return this;
  }

  shift() {
    if (!this.head) return undefined;

    let temp = this.head;

    this.head = this.head.next;
    temp.next = null;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return temp;
  }

  get(index: number) {
    if (index < 0 || index >= this.length) return undefined;

    let temp = this.head;

    for (let i = 0; i < index; index++) {
      if (temp) {
        temp = temp.next;
      }
    }

    return temp as NodeLinkedList;
  }

  set(index: number, value: number) {
    let temp = this.get(index);

    if (temp) {
      temp.value = value;
      return true;
    }

    return false;
  }

  insert(index: number, value: number) {
    if (index < 0 || index > this.length) return undefined;
    if (index === 0) return this.unshift(value);
    if (index === this.length) return this.push(value);

    const newNode = new NodeLinkedList(value);
    let temp = this.get(index - 1);

    if (temp) {
      newNode.next = temp.next;
      temp.next = newNode;
      this.length++;

      return true;
    }

    return false;
  }

  remove(index: number) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    let before = this.get(index - 1);
    let temp = before?.next;

    if (before && temp) {
      before.next = temp.next;
      temp.next = null;
      this.length--;

      return temp;
    }
  }

  reverse(): LinkedListTypescript {
    let temp = this.head;
    this.head = this.tail;
    this.tail = temp;

    let next = temp?.next;
    let prev: NodeLinkedList | null = null;

    for (let index = 0; index < this.length; index++) {
      if (next && temp && prev) {
        next = temp.next;
        temp.next = prev;
        prev = temp;
        temp = next;
      }
    }

    return this;
  }
}
