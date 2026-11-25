<script setup>
defineProps({
  item: { type: Object, required: true }
})
defineEmits(['toggle', 'remove'])
</script>

<template>
  <article class="item-card">
    <div class="item-main">
      <span class="item-id">#{{ item.id }}</span>
      <strong>{{ item.title }}</strong>
      <span class="status" :class="item.active ? 'status-active' : 'status-inactive'">
        {{ item.active ? 'Активна' : 'Неактивна' }}
      </span>
    </div>
    <div class="item-actions">
      <button class="button button-light" type="button" @click="$emit('toggle', item.id)">
        Изменить статус
      </button>
      <button class="button button-danger" type="button" @click="$emit('remove', item.id)">
        Удалить
      </button>
    </div>
  </article>
</template>
