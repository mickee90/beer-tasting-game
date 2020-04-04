<template>
  <input
    :type="type"
    class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    :class="classes"
    v-bind="$attrs"
    @input="$emit('update', $event.target.value)"
    v-on="$listeners"
  />
</template>

<script>
export default {
  // Disable automatic attribute inheritance, so that $attrs are
  // passed to the <input>, even if it's not the root element.
  // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
  inheritAttrs: false,
  // Change the v-model event name to `update` to avoid changing
  // the behavior of the native `input` event.
  // https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model
  model: {
    event: "update",
  },
  props: {
    type: {
      type: String,
      default: "text",
      // Only allow types that essentially just render text boxes.
      validator(value) {
        return [
          "email",
          "number",
          "password",
          "search",
          "tel",
          "text",
          "url",
        ].includes(value);
      },
    },
    classes: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped></style>
