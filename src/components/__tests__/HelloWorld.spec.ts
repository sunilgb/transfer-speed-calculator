import {describe, expect, it} from 'vitest'

import {mount} from '@vue/test-utils'
import Basic from '../Basic.vue'

describe('Basic', () => {
  it('renders properly', () => {
    const wrapper = mount(Basic, {props: {msg: 'Hello Vitest'}})
    expect(wrapper.text()).toContain('')
  })
})
