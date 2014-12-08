::My_logger = Logger.new(STDOUT)
::MyPubnub = Pubnub.new(
    :subscribe_key    => Rails.application.secrets.subscribe_key,
    :publish_key      => Rails.application.secrets.publish_key,
    :error_callback   => lambda { |msg|
      puts "Error callback says: #{msg.inspect}"
    },
    :connect_callback => lambda { |msg|
      puts "CONNECTED: #{msg.inspect}"
    },
    :logger => My_logger,
    :timeout => 15,
    :subscribe_timeout          => 310,
    :non_subscribe_timeout      => 15
)

::My_callback = lambda { |message| Friendship.message_callback(message.msg) }
::My_left_callback = lambda { |message| puts "======#{message}=====" }

c = Friendship.pluck(:channel_id)
c = c.reject{|x| x.nil? }
if c.present?
MyPubnub.leave(
    :channel => c,
    :force => true,
    :callback => My_left_callback
)
end

c = Friendship.online_channel_ids(AuthenticationToken.pluck(:user_id))
if c.present?
  MyPubnub.subscribe(
      :channel  => c,
      :callback => My_callback
  )
end
# MyPubnub.publish(:channel => c.first,
#     :message => {:sid => "3", :rid => "1", :message => "I", :isTranslated => false, :mid => DateTime.now.to_i},
#     :callback => My_callback
# )

# MyPubnub.subscribe(
#     :channel  => c.first,
#     :callback => My_callback
# )