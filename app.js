var ws, stanza;
var homepage = 'introduzione.html';

function WSconnetti(st, msg)
{
	var ok = 1;
	
	try
	{
		ws = new WebSocket('ws://bobvann.noip.me:8090');
		stanza = st;
		// --- init dall'applicazione all'apertura del canale websocket ---
		ws.addEventListener('open', function()
		{ 
			ws.send("c:" + stanza);
			ws.send("m:" + stanza + ":" + msg);
			}, false);

		// --- ricezione messaggi dal websocket ---
		ws.addEventListener('message', function(evt)
		{
			var msg = evt.data;
			WSricevi(msg);
		});
	}
	catch(e)
	{
	ok = 0;
	}
	
	return ok;
}

  // --- invio messaggi al websocket ---
function WSinvia(msg) 
{
	ws.send("m:"+ stanza + ":" + msg);
}

function WSricevi(msg)
{	
	if (msg.substr(0,1) == 'a')
	{
		switch (msg.substr(2))
		{
			case "pSu":
				location.href = prevpage;
				break;
			case "pGiu":
				location.href = nextpage;
				break;
			case "pHome":
				location.href = homepage;
				break;
			case "sPiu":
				slidePiu();
				break;
			case "sMeno":
				slideMeno();
				break;
			case "sHome":
				slideHome();
				break;
			case "vStart":
				funcVStart();
				break;
			case "vPausa":
				funcVPausa();
				break;
			case "vStop":
				funcVStop();
				break;
		}
	}
	else
		if (msg=="iPhoneConnesso")
			WSinvia(pagespec);
			
}