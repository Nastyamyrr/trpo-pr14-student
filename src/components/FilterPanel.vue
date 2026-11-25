<script setup>
defineProps({
  query: { type: String, required: true },
  status: { type: String, required: true }
})
defineEmits(['update:query', 'update:status'])
</script>

<template>
  <section class="filters" aria-label="Фильтры записей">
    <label class="field">
      <span>Поиск по названию</span>
      <input
        :value="query"
        type="search"
        placeholder="Например, OK"
        @input="$emit('update:query', $event.target.value)"
      />
    </label>
    <label class="field">
      <span>Состояние</span>
      <select :value="status" @change="$emit('update:status', $event.target.value)">
        <option value="all">Все записи</option>
        <option value="active">Активные</option>
        <option value="inactive">Неактивные</option>
      </select>
    </label>
  </section>
</template>
