export class Fibonacci_heap {
  m_min: Entry | null = null;
  m_size = 0;

  isValid() {
    return this.m_min !== null;
  }

  enqueue(value, priority: number) {
    Fibonacci_heap._check_priority(priority);
    const result = new Entry(value, priority);
    this.m_min = merge_lists(this.m_min, result);
    this.m_size += 1;
    return result;
  }

  bool() {
    return this.m_min !== null;
  }

  len() {
    return this.m_size;
  }

  dequeue_min() {
    if (!this.bool()) {
      throw Error('Heap is empty.');
    }

    this.m_size -= 1;
    const min_elem = this.m_min;

    if (this.m_min.m_next === this.m_min) {
      this.m_min = null;
    } else {
      this.m_min.m_prev.m_next = this.m_min.m_next;
      this.m_min.m_next.m_prev = this.m_min.m_prev;
      this.m_min = this.m_min.m_next;
    }

    if (min_elem.m_child !== null) {
      let curr = min_elem.m_child;
      while (true) {
        curr.m_parent = null;
        curr = curr.m_next;
        if (curr === min_elem.m_child) {
          break;
        }
      }
    }

    this.m_min = merge_lists(this.m_min, min_elem.m_child);

    if (this.m_min === null) {
      return min_elem;
    }

    const tree_table: Entry[] = [];
    const to_visit = [];

    let curr = this.m_min;
    while (to_visit.length === 0 || to_visit[0] !== curr) {
      to_visit.push(curr);
      curr = curr.m_next;
    }

    for (curr of to_visit) {
      while (true) {
        while (curr.m_degree >= tree_table.length) {
          tree_table.push(null);
        }

        if (!tree_table[curr.m_degree]) {
          tree_table[curr.m_degree] = curr;
          break;
        }

        const other = tree_table[curr.m_degree];
        tree_table[curr.m_degree] = null;

        const minimum = other.m_priority < curr.m_priority ? other : curr;
        const maximum = other.m_priority < curr.m_priority ? curr : other;

        maximum.m_next.m_prev = maximum.m_prev;
        maximum.m_prev.m_next = maximum.m_next;

        maximum.m_next = maximum.m_prev = maximum;
        minimum.m_child = merge_lists(minimum.m_child, maximum);

        maximum.m_parent = minimum;
        maximum.m_is_marked = false;

        minimum.m_degree += 1;

        curr = minimum;
      }

      if (curr.m_priority <= this.m_min.m_priority) {
        this.m_min = curr;
      }
    }
    return min_elem;
  }

  decrease_key(entry: Entry, new_priority: number) {
    Fibonacci_heap._check_priority(new_priority);

    if (new_priority > entry.m_priority) {
      throw Error('New priority exceeds old.');
    }
    this.decrease_key_unchecked(entry, new_priority);
  }

  delete(entry: Entry) {
    this.decrease_key_unchecked(entry, -Infinity);
    this.dequeue_min();
  }

  static _check_priority(priority: number) {
    if (priority !== priority || priority === Infinity || priority === -Infinity) {
      throw Error(`Priority ${priority} is invalid.`);
    }
  }

  decrease_key_unchecked(entry: Entry, priority: number) {
    entry.m_priority = priority;

    if (entry.m_parent !== null && entry.m_priority <= entry.m_parent.m_priority) {
      this.cut_node(entry);
    }

    if (entry.m_priority <= this.m_min.m_priority) {
      this.m_min = entry;
    }
  }

  cut_node(entry: Entry) {
    entry.m_is_marked = false;

    if (entry.m_parent === null) {
      return;
    }

    if (entry.m_next !== entry) {
      entry.m_next.m_prev = entry.m_prev;
      entry.m_prev.m_next = entry.m_next;
    }

    if (entry.m_parent.m_child === entry) {
      if (entry.m_next !== entry) {
        entry.m_parent.m_child = entry.m_next;
      } else {
        entry.m_parent.m_child = null;
      }
    }

    entry.m_parent.m_degree -= 1;
    entry.m_prev = entry.m_next = entry;
    this.m_min = merge_lists(this.m_min, entry);

    if (entry.m_parent.m_is_marked) {
      this.cut_node(entry.m_parent);
    } else {
      entry.m_parent.m_is_marked = true;
    }

    entry.m_parent = null;
  }
}

class Entry {
  // __slots__ = ['m_degree', 'm_is_marked', 'm_parent', 'm_child', 'm_next', 'm_prev', 'm_elem', 'm_priority']; // ??

  m_degree = 0;
  m_is_marked = false;
  m_parent = null;
  m_child = null;
  m_next: Entry | null = null;
  m_prev: Entry | null = null;
  m_elem: unknown | null = null;
  m_priority: number;

  constructor(elem, priority: number) {
    this.m_next = this.m_prev = this;
    this.m_elem = elem;
    this.m_priority = priority;
  }

  '<'(other: Entry) {
    return this.m_priority < other.m_priority;
  }

  '=='(other: Entry) {
    if (this.m_priority == other.m_priority) {
      return true;
    }

    return this.m_elem == other.m_elem;
  }

  '>'(other: Entry) {
    if (this.m_priority > other.m_priority) {
      return true;
    }

    return this.m_elem > other.m_elem;
  }

  compare(other: Entry) {
    if (this['<'](other)) {
      return -1;
    }

    if (this['>'](other)) {
      return 1;
    }

    return 0;
  }

  get_value() {
    return this.m_elem;
  }
}

const merge_lists = (one: Entry, two: Entry) => {
  if (!one && !two) {
    return null;
  }

  if (one && !two) {
    return one;
  }

  if (!one && two) {
    return two;
  }

  const one_next = one.m_next;

  one.m_next = two.m_next;
  one.m_next.m_prev = one;
  two.m_next = one_next;
  two.m_next.m_prev = two;

  if (one.m_priority < two.m_priority) {
    return one;
  }
  return two;
};
