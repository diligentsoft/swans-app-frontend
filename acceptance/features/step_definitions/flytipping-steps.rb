
Given("access to the app") do
  visit Settings.swans_app_frontend.base_url
  click_link 'Sign up now'

  fill_in 'Firstname', with: 'John'
  fill_in 'Lastname', with: 'Doe'
  fill_in 'Email', with: 'john.doe@example.com'
  fill_in 'Building name/number', with: '32'
  fill_in 'Street', with: 'De La Beche Road'
  fill_in 'Locality', with: 'Sketty'
  fill_in 'City', with: 'Swansea'
  fill_in 'Postcode', with: 'SA2 9AR'
  check 'Agree T&Cs'
  click_button 'Submit'

  fill_in 'Email address', with: 'john.doe@example.com'
  click_button 'Submit'
  using_wait_time 10 do
    expect(page).to have_selector('.l-locationpicker-class div')
  end
  # using_wait_time 10 do
  #   expect(page).to have_selector('textarea#description')
  # end
end

When("I submit the details of a fly tipping incident") do
  fill_in 'Description', with: 'Tyres dumped in lane'
  click_button 'Submit'
end

When("I submit the details of a fly tipping incident with an image") do
  fill_in 'Description', with: 'Tyres dumped in lane'
  attach_file('Image', File.absolute_path('features/support/files/flytipping-pic.png'))
  click_button 'Submit'
end

Then("the council will be notified of the fly tipping incident") do
  expect(page).to have_content 'Flytipping report successfully submitted.'
end

