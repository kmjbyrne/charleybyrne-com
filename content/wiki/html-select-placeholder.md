---
title: HTML Select Placeholder
category: HTML
---

How to create an HTML select with placeholder option.

## Basic HTML

```html
<select>
  <option value="default" selected="selected">Choose...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
  <option value="4">Option 4</option>
</select>
```

## Vue Nuxt

```vue
<template>
  <div class="row">
    <select class="dropdown" v-model="category">
      <option value="default" selected="selected">Choose...</option>
      <option v-for="cat in categories" :value="cat" :key="cat">
        {{ cat }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default {
  data() {
    return {
      categories: ["Sports", "News", "Science"],
      category: "default",
    };
  },
};
</script>
```
