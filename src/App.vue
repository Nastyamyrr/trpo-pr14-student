<script setup>
import { ref } from 'vue'
import FilterPanel from './components/FilterPanel.vue'
import ItemCard from './components/ItemCard.vue'
import { useCatalog } from './composables/useCatalog'

const {
  items, query, status, error, visibleItems, stats,
  toggleItem, removeItem, addItem, showDemoError, clearError
} = useCatalog()

const newTitle = ref('')
const addMessage = ref('')

function submitItem() {
  const added = addItem(newTitle.value)
  addMessage.value = added ? 'Запись добавлена.' : 'Введите название записи.'
  if (added) newTitle.value = ''
}
</script>

<template>
  <header class="topbar">
    <div class="topbar-inner">
      <div class="brand">Практическая работа 14</div>
      <span class="course">ТРПО</span>
    </div>
  </header>

  <main class="container">
    <section class="intro">
      <span class="eyebrow">Аудит качества данных</span>
      <h1>Проверка и оптимизация Vue-приложения</h1>
      <p>Работа с некорректными записями, фильтрацией и состояниями интерфейса.</p>
    </section>

    <section class="stats-grid" aria-label="Статистика">
      <article class="stat-card">
        <span class="stat-label">Всего записей</span>
        <strong>{{ stats.total }}</strong>
        <small>После нормализации данных</small>
      </article>
      <article class="stat-card">
        <span class="stat-label">Активные</span>
        <strong>{{ stats.active }}</strong>
        <small>Можно изменить статус</small>
      </article>
      <article class="stat-card">
        <span class="stat-label">Требуют внимания</span>
        <strong>{{ stats.invalidTitles }}</strong>
        <small>Название восстановлено безопасно</small>
      </article>
    </section>

    <section class="panel">
      <div class="section-heading">
        <div>
          <span class="eyebrow">Каталог</span>
          <h2>Записи dataset</h2>
        </div>
        <span class="count">{{ visibleItems.length }} из {{ items.length }}</span>
      </div>

      <form class="add-form" @submit.prevent="submitItem">
        <label class="field grow">
          <span>Новая запись</span>
          <input v-model="newTitle" type="text" placeholder="Введите название" />
        </label>
        <button class="button button-primary" type="submit">Добавить</button>
      </form>
      <p v-if="addMessage" class="hint" role="status">{{ addMessage }}</p>

      <FilterPanel
        v-model:query="query"
        v-model:status="status"
      />

      <div v-if="error" class="alert" role="alert">
        {{ error }}
        <button class="text-button" type="button" @click="clearError">Скрыть</button>
      </div>

      <div v-if="visibleItems.length" class="items-list">
        <ItemCard
          v-for="item in visibleItems"
          :key="item.id"
          :item="item"
          @toggle="toggleItem"
          @remove="removeItem"
        />
      </div>
      <div v-else class="empty-state">
        <strong>Ничего не найдено</strong>
        <p>Измени поисковый запрос или выбери другое состояние.</p>
      </div>
    </section>

    <section class="panel quality-panel">
      <div>
        <span class="eyebrow">Проверки</span>
        <h2>Что исправлено</h2>
      </div>
      <ul class="check-list">
        <li>Вычисляемая фильтрация вынесена из шаблона в computed</li>
        <li>Дочерний компонент не изменяет props — использует emits</li>
        <li>Для списка применяется устойчивый :key="item.id"</li>
        <li>Отсутствующее или пустое название обрабатывается безопасно</li>
      </ul>
      <button class="button button-light" type="button" @click="showDemoError">
        Показать ошибочное состояние
      </button>
    </section>
  </main>
</template>
