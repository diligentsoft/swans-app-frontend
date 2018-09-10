require 'config'
require 'date'
require 'active_support/time'
require 'selenium/webdriver'
require 'capybara/cucumber'

Config.load_and_set_settings(
    Config.setting_files('config', ENV['ENVIRONMENT'] || 'local')
)

# Capybara.register_driver :headless_chrome do |app|
#   capabilities = Selenium::WebDriver::Remote::Capabilities.chrome(
#     chromeOptions: { args: %w(headless disable-gpu) }
#   )
#
#   Capybara::Selenium::Driver.new app,
#                                  browser: :chrome,
#                                  desired_capabilities: capabilities
# end

#Capybara.javascript_driver = :headless_chrome

# Capybara.register_driver :selenium_chrome_headless_docker_friendly do |app|
#   Capybara::Selenium::Driver.load_selenium
#   browser_options = ::Selenium::WebDriver::Chrome::Options.new
#   browser_options.args << '--headless'
#   browser_options.args << '--disable-gpu'
#   # Sandbox cannot be used inside unprivileged Docker container
#   browser_options.args << '--no-sandbox'
#   Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
# end
#
# Capybara.default_driver = :selenium_chrome_headless_docker_friendly

#Capybara.default_driver = :selenium_chrome
#Capybara.default_driver = :selenium_chrome_headless

# Capybara.register_driver :headless_firefox do |app|
#   browser_options = Selenium::WebDriver::Firefox::Options.new()
#   browser_options.args << '--headless'
#   Capybara::Selenium::Driver.new(
#     app,
#     browser: :firefox,
#     options: browser_options
#   )
# end

#Capybara.default_driver = :headless_firefox

Capybara.default_driver = :selenium_chrome_headless
