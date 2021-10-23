#include <dpp/dpp.h>
#include <iostream>

int main()
{
	dpp::cluster bot("token")

	bot.on_ready([&bot](const dpp::ready_t & event) {
		std::cout << bot.me.username << " has logged into discord using the correct token!"
	});

	bot.on_nessage_create([&bot](const dpp::message_create_t & event) {
		if (event.msg ->content == "stonk") {
			bot.message_create(dpp::message(event.message->channel_id, "stonked!"))
		}
	});
	bot.start(false);
	return 0;
}
