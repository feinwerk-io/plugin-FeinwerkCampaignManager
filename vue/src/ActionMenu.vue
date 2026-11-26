<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  A small "more actions" menu (UI review R50 D1: one primary action, the rest in a menu): a button
  with Matomo's "more" icon and a list of items, each a button or a link. Opens with click, Enter,
  Space or the down arrow; the arrow keys, Home and End move between the items; Escape and a click
  outside close it and return the focus to the button.
-->
<template>
  <div ref="root" class="fwcmp-menu">
    <button
      ref="toggle"
      type="button"
      class="fwcmp-action fwcmp-menu__toggle"
      aria-haspopup="true"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-label="label"
      :title="label"
      @click="toggle"
      @keydown.down.prevent="openAt(0)"
    ><span class="icon-more-horiz" aria-hidden="true" /></button>
    <ul
      v-if="open"
      class="fwcmp-menu__list"
      role="menu"
      :aria-label="label"
      @keydown="onKey"
    >
      <li v-for="item in items" :key="item.key" role="none">
        <a
          v-if="item.href"
          class="fwcmp-menu__item"
          role="menuitem"
          tabindex="-1"
          :href="item.href"
          @click="close(false)"
        >{{ item.label }}</a>
        <button
          v-else
          type="button"
          class="fwcmp-menu__item"
          role="menuitem"
          tabindex="-1"
          @click="choose(item.key)"
        >{{ item.label }}</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export interface ActionMenuItem {
  key: string;
  label: string;
  /** a link instead of an action */
  href?: string;
}

export default defineComponent({
  props: {
    items: { type: Array as PropType<ActionMenuItem[]>, required: true },
    /** the button's accessible name, e.g. "More actions for autumn-deals" */
    label: { type: String, required: true },
  },
  emits: ['select'],
  data() {
    return { open: false };
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.outside, true);
  },
  methods: {
    toggle() {
      if (this.open) {
        this.close(true);
      } else {
        this.openAt(0);
      }
    },
    openAt(index: number) {
      this.open = true;
      document.addEventListener('mousedown', this.outside, true);
      this.$nextTick(() => this.focusItem(index));
    },
    close(focusToggle: boolean) {
      this.open = false;
      document.removeEventListener('mousedown', this.outside, true);
      if (focusToggle) {
        const toggle = this.$refs.toggle as HTMLElement | undefined;
        if (toggle) {
          toggle.focus();
        }
      }
    },
    choose(key: string) {
      this.close(true);
      this.$emit('select', key);
    },
    outside(event: Event) {
      const root = this.$refs.root as HTMLElement | undefined;
      if (root && !root.contains(event.target as Node)) {
        this.close(false);
      }
    },
    itemsInDom(): HTMLElement[] {
      const root = this.$refs.root as HTMLElement | undefined;
      return root ? Array.from(root.querySelectorAll<HTMLElement>('.fwcmp-menu__item')) : [];
    },
    focusItem(index: number) {
      const all = this.itemsInDom();
      if (all.length) {
        all[(index + all.length) % all.length].focus();
      }
    },
    onKey(event: KeyboardEvent) {
      const all = this.itemsInDom();
      const current = all.indexOf(document.activeElement as HTMLElement);
      const moves: Record<string, number> = {
        ArrowDown: current + 1, ArrowUp: current - 1, Home: 0, End: all.length - 1,
      };
      if (event.key === 'Escape' || event.key === 'Tab') {
        if (event.key === 'Escape') {
          // the menu's Escape is not the page's
          event.preventDefault();
          event.stopPropagation();
        }
        this.close(event.key === 'Escape');
        return;
      }
      if (moves[event.key] !== undefined) {
        event.preventDefault();
        this.focusItem(moves[event.key]);
      }
    },
  },
});
</script>
