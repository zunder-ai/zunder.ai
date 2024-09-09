<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
import { ref, reactive } from 'vue'

interface Blok {
  title?: string;
  description?: string;
  items?: any[];
  itemsSubscription?: any[];
}

const includedInEveryPlan = [
  { title: 'Dedicated Project Manager' },
  { title: 'Fast delivery in EU time zone (Mo-Fr)' },
  { title: 'Free & unlimited revisions in subscriptions' },
  { title: 'Works with agencies too / white-labeled' },
  { title: 'Stock photos & Stock illustrations included' },
  { title: 'Deliverables in Figma, Code, live Project' },
  { title: 'Real-time Slack collaboration' }
]

const props = defineProps<{ blok: Blok }>()

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'This field is not allowed to be empty',
    'string.base': 'Input is not a string',
    'string.empty': 'This field is not allowed to be empty'
  }),
  email: Joi.string().email({ tlds: { allow: false }}).required().messages({
    'any.required': 'This field is not allowed to be empty',
    'string.email': 'Input is not a valid e-mail.',
    'string.base': 'Input is not a string',
    'string.empty': 'This field is not allowed to be empty'
  })
})

const formData = reactive({
  name: '',
  email: ''
})

const hideBotPrice = ref<boolean>(true)
const toggle = ref<boolean>(false)
const showModal = ref(false)
const selectedPlan = ref('')
const submitting = ref(false)

const items = computed(() => props.blok.items)

const handleCardButtonClick = (action: string, planTitle: string) => {
  switch (action) {
  case 'modal': {
    selectedPlan.value = planTitle
    showModal.value = true
    break
  }
  case 'redirect': {
    const item = items.value.find((i) => i.title === planTitle)
    if (item && item.button.href) {
      window.open(item.button.href, '_blank')
    }
    break
  }
  case 'email': {
    window.location.href = 'mailto:hello@regenrek.at'
    break
  }
  }
}

const submitForm = async (event: FormSubmitEvent<any>) => {
  submitting.value = true
  // Here you can implement the logic to handle the form submission
  console.log('Form submitted:', event.data)
  try {
    await $fetch("/api/getting-startet-free", { method: 'POST', body: { ...event.data, title: selectedPlan.value } })
    // You might want to send this data to your backend or perform other actions
    // After submission, close the modal
    showModal.value = false
    // Reset the form data
    formData.name = ''
    formData.email = ''
    
  } catch (error) {
    console.error(error)
  } finally {
    submitting.value = false
  }
}

</script>

<template>
  <UContainer>
    <div class="grid gap-y-6">
      <!-- card price -->
      <div class="flex justify-center">
        <div
          v-if="!toggle"
          class="grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 grid-cols-1 gap-6 w-full"
        >
          <CardPrice
            v-for="item in items"
            :key="item.id"
            v-bind="item"
            @button-click="handleCardButtonClick"
          />
        </div>
      </div>

      <div
        v-if="!hideBotPrice"
        class="flex flex-col bg-gray-50 dark:bg-gray-800 rounded-3xl text-cod-gray-100 px-8 py-8 lg:p-10 shadow-lg"
      >
        <Typo tag="h3" size="md" class="font-semibold text-bg-cod-gray-100">
          Included with every plan
        </Typo>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Typo
            tag="ul"
            size="base"
            theme="light"
            class="flex flex-col gap-y-3.5 pt-4"
          >
            <li
              v-for="(item, index) in includedInEveryPlan.slice(0, 3)"
              :key="index"
              class="flex gap-x-1 items-start"
            >
              <Icon
                name="lucide:arrow-up-right"
                class="opacity-50 mr-1 text-cod-gray-100"
              />
              <Typo tag="span" size="sm" class="leading-none dark:text-white">
                {{ item.title }}
              </Typo>
            </li>
          </Typo>

          <Typo
            tag="ul"
            size="base"
            theme="light"
            class="flex flex-col gap-y-3.5 pt-4"
          >
            <li
              v-for="(item, index) in includedInEveryPlan.slice(3, 6)"
              :key="index"
              class="flex gap-x-1 items-start"
            >
              <Icon
                name="lucide:arrow-up-right"
                class="opacity-50 mr-1 text-cod-gray-100"
              />
              <Typo tag="span" size="sm" class="leading-none">
                {{ item.title }}
              </Typo>
            </li>
          </Typo>

          <Typo
            tag="ul"
            size="base"
            theme="light"
            class="flex flex-col gap-y-3.5 pt-4"
          >
            <li
              v-for="(item, index) in includedInEveryPlan.slice(6)"
              :key="index"
              class="flex gap-x-1 items-start"
            >
              <Icon
                name="lucide:arrow-up-right"
                class="opacity-50 mr-1 text-cod-gray-100"
              />
              <Typo tag="span" size="sm" class="leading-none">
                {{ item.title }}
              </Typo>
            </li>
          </Typo>
        </div>
      </div>
    </div>
  </UContainer>

  <!-- Modal for the free plan -->
  <UModal
    v-model="showModal"
    :ui="{
      width: 'w-full sm:max-w-screen-lg',
      padding: 'p-4 sm:p-4',
    }"
  >
    <UCard class="relative" :ui="{ body: { padding: 'p-0 sm:p-6' } }">
      <div
        class="relative sm:pt-8 lg:pt-0 grid grid-cols-1 lg:grid-cols-2 isolate h-full z-[1]"
      >
        <div class="absolute top-0 right-0 z-10">
          <UButton
            icon="i-heroicons-x-mark"
            variant="link"
            @click="showModal = false"
          />
        </div>
        <div
          class="bg-white dark:bg-gray-800 sm:dark:bg-white sm:bg-gray-800 px-6 py-8 rounded-lg flex flex-col gap-y-8"
        >
          <h3
            class="text-gray-900 dark:text-white sm:text-white sm:dark:text-gray-900 text-4xl"
          >
            <span>Get Startet with:</span><br>
            <span class="font-bold">{{ selectedPlan }}</span>
          </h3>
          <UForm :schema="schema" :state="formData" class="space-y-4" @submit="submitForm">
            <UFormGroup
              label="Name"
              name="name"
              required
              :ui="{
                label: {
                  base: 'text-gray-900 dark:text-white sm:text-white sm:dark:text-gray-900',
                },
              }"
            >
              <UInput
                v-model="formData.name"
                placeholder="Name"
                color="primary"
                variant="outline"
                :ui="{ variant: { outline : 'text-gray-900 dark:text-white sm:text-white sm:dark:text-gray-900'}}"
              />
            </UFormGroup>
            <UFormGroup
              label="Email"
              name="email"
              required
              :ui="{
                label: {
                  base: 'text-gray-900 dark:text-white sm:text-white sm:dark:text-gray-900',
                },
              }"
            >
              <UInput
                v-model="formData.email"
                placeholder="Email"
                type="email"
                color="primary"
                variant="outline"
                :ui="{ variant: { outline : 'text-gray-900 dark:text-white sm:text-white sm:dark:text-gray-900'}}"
              />
            </UFormGroup>
            <UButton type="submit" label="Submit" :loading="submitting" block />
          </UForm>
        </div>
        <div
          class="hidden lg:flex lg:justify-center lg:items-center lg:flex-col py-8 px-6"
        >
          <Logo class="w-2/3" />
        </div>
      </div>
    </UCard>
  </UModal>
</template>
