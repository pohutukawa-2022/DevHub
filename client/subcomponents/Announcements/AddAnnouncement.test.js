import React from 'react'
import userEvent from '@testing-library/user-event'
import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import AddAnnouncement from './AddAnnouncement'

describe('Announcement adding field', () => {
  it('updates correctly on user input', async () => {
    const showAdd = true

    render(<AddAnnouncement showAdd={showAdd} />)

    const announcementInput = screen.getByRole('textbox', { name: 'Message:' })
    userEvent.type(announcementInput, 'serious')
    await waitFor(() => {
      expect(announcementInput).toHaveValue('serious')
    })
  })
})
