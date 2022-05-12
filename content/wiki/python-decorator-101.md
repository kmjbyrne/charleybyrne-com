---
title: Python Decorators 101
category: Python
---

```python

from functools import wraps

def outer():
    @wraps
    def inner():
        return inner
    return outer
```
