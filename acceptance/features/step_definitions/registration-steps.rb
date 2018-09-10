Given("access to the regisration page") do
  visit Settings.swans_app_frontend.base_url
  click_link 'Sign up now'
  expect(page).to have_content 'Signup'
end

When("I submit my details") do
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
  expect(page).to have_content 'Login'
end

Then("I can login with my details") do
  fill_in 'Email address', with: 'john.doe@example.com'
  click_button 'Submit'
  expect(page).to have_content 'Flytipping'
end
