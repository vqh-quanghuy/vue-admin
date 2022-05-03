<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a @click="PREV" href="javascript:void(0)" class="btn page-link" :class="isPrevDisabled?'disabled':''">Previous</a>
      </li>
      <li class="page-item">
        <a @click="NEXT" href="javascript:void(0)" class="btn page-link" :class="isNextDisabled?'disabled':''">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "Paginator",
  emits: ['page-changed'],
  props: {
    lastPage: Number
  },
  setup(props, { emit }) {
    const PAGE = ref(1);
    let isNextDisabled = ref(false);
    let isPrevDisabled = ref(false);

    const DISABLE = () => {
      isPrevDisabled.value = false;
      isNextDisabled.value = false;
      if (PAGE.value === props.lastPage) {
        isNextDisabled.value = true;
      } else if (PAGE.value === 1) {
        isPrevDisabled.value = true;
      }
    }
    DISABLE();
    const NEXT = async () => {
      if (PAGE.value === props.lastPage) return;
      PAGE.value++;
      emit('page-changed', PAGE.value);
      DISABLE()
    };
    const PREV = async () => {
      if (PAGE.value === 1) return;
      PAGE.value--;
      emit('page-changed', PAGE.value);
      DISABLE()
    };

    return {
      NEXT,
      PREV,
      isNextDisabled,
      isPrevDisabled
    }
  },
}
</script>
