{
	"patcher" : 	{
		"fileversion" : 1,
		"rect" : [ 1.0, 383.0, 669.0, 484.0 ],
		"bglocked" : 0,
		"defrect" : [ 1.0, 383.0, 669.0, 484.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 0,
		"default_fontsize" : 9.0,
		"default_fontface" : 0,
		"default_fontname" : "Osaka",
		"gridonopen" : 0,
		"gridsize" : [ 13.0, 13.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"maxclass" : "slider",
					"prototypename" : "horizontal",
					"outlettype" : [ "" ],
					"size" : 4096.0,
					"numinlets" : 1,
					"relative" : 1,
					"patching_rect" : [ 343.0, 49.0, 119.0, 19.0 ],
					"numoutlets" : 1,
					"id" : "obj-20"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "pak w b 0 0 0",
					"outlettype" : [ "" ],
					"fontsize" : 9.0,
					"numinlets" : 5,
					"patching_rect" : [ 383.0, 100.0, 73.729996, 19.0 ],
					"numoutlets" : 1,
					"id" : "obj-6",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "number",
					"outlettype" : [ "int", "bang" ],
					"fontsize" : 9.0,
					"numinlets" : 1,
					"patching_rect" : [ 329.0, 77.0, 50.0, 19.0 ],
					"numoutlets" : 2,
					"id" : "obj-33",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "pak w a 0 0",
					"outlettype" : [ "" ],
					"fontsize" : 9.0,
					"numinlets" : 4,
					"patching_rect" : [ 301.0, 101.0, 60.599998, 19.0 ],
					"numoutlets" : 1,
					"id" : "obj-26",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "button",
					"outlettype" : [ "bang" ],
					"numinlets" : 1,
					"patching_rect" : [ 108.0, 207.0, 20.0, 20.0 ],
					"numoutlets" : 1,
					"id" : "obj-11"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "button",
					"outlettype" : [ "bang" ],
					"numinlets" : 1,
					"patching_rect" : [ 189.0, 287.0, 20.0, 20.0 ],
					"numoutlets" : 1,
					"id" : "obj-24"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "t b 1",
					"outlettype" : [ "bang", "int" ],
					"fontsize" : 9.0,
					"numinlets" : 1,
					"patching_rect" : [ 107.0, 232.0, 32.825001, 19.0 ],
					"numoutlets" : 2,
					"id" : "obj-17",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "toggle",
					"outlettype" : [ "int" ],
					"numinlets" : 1,
					"patching_rect" : [ 218.0, 243.0, 20.0, 20.0 ],
					"numoutlets" : 1,
					"id" : "obj-23"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "gate",
					"outlettype" : [ "" ],
					"fontsize" : 9.0,
					"numinlets" : 2,
					"patching_rect" : [ 218.0, 268.0, 32.825001, 19.0 ],
					"numoutlets" : 1,
					"id" : "obj-19",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "a 301 296 291 302 311 299",
					"outlettype" : [ "" ],
					"fontsize" : 9.0,
					"numinlets" : 2,
					"patching_rect" : [ 254.0, 268.0, 179.0, 17.0 ],
					"numoutlets" : 1,
					"id" : "obj-18",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "t b s",
					"outlettype" : [ "bang", "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 69.0, 127.0, 43.825001, 21.0 ],
					"numoutlets" : 2,
					"id" : "obj-1",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "port usbserial-A900abz9",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 2,
					"patching_rect" : [ 69.0, 158.0, 142.0, 19.0 ],
					"numoutlets" : 1,
					"id" : "obj-10",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "prepend set port",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 69.0, 100.0, 91.909996, 21.0 ],
					"numoutlets" : 1,
					"id" : "obj-2",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "device",
					"outlettype" : [ "clear" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 13.0, 56.0, 39.389999, 18.0 ],
					"numoutlets" : 1,
					"id" : "obj-5",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "print",
					"outlettype" : [ "" ],
					"fontsize" : 10.0,
					"numinlets" : 2,
					"patching_rect" : [ 13.0, 36.0, 32.825001, 16.0 ],
					"numoutlets" : 1,
					"id" : "obj-14",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "loadbang",
					"outlettype" : [ "bang" ],
					"fontsize" : 10.0,
					"numinlets" : 1,
					"patching_rect" : [ 13.0, 14.0, 52.52, 18.0 ],
					"numoutlets" : 1,
					"id" : "obj-15",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "umenu",
					"outlettype" : [ "int", "", "" ],
					"fontsize" : 10.0,
					"items" : [ "usbserial-A900abz9", ",", "Bluetooth-PDA-Sync", ",", "Bluetooth-Modem" ],
					"types" : [  ],
					"numinlets" : 1,
					"patching_rect" : [ 13.0, 77.0, 131.0, 18.0 ],
					"numoutlets" : 3,
					"id" : "obj-16",
					"fontname" : "Arial"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "toggle",
					"outlettype" : [ "int" ],
					"numinlets" : 1,
					"patching_rect" : [ 107.0, 258.0, 20.0, 20.0 ],
					"numoutlets" : 1,
					"id" : "obj-21"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "asciimessage2max",
					"outlettype" : [ "" ],
					"fontsize" : 9.0,
					"numinlets" : 1,
					"patching_rect" : [ 232.0, 222.0, 90.0, 19.0 ],
					"numoutlets" : 1,
					"id" : "obj-3",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "max2asciimessage",
					"outlettype" : [ "" ],
					"fontsize" : 9.0,
					"numinlets" : 1,
					"patching_rect" : [ 232.0, 156.0, 92.0, 19.0 ],
					"numoutlets" : 1,
					"id" : "obj-4",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "r d",
					"outlettype" : [ "" ],
					"fontsize" : 9.0,
					"numinlets" : 2,
					"patching_rect" : [ 266.0, 102.0, 30.0, 17.0 ],
					"numoutlets" : 1,
					"id" : "obj-7",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "print",
					"fontsize" : 9.0,
					"numinlets" : 1,
					"patching_rect" : [ 218.0, 291.0, 31.0, 19.0 ],
					"numoutlets" : 0,
					"id" : "obj-8",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "message",
					"text" : "r a",
					"outlettype" : [ "" ],
					"fontsize" : 9.0,
					"numinlets" : 2,
					"patching_rect" : [ 232.0, 102.0, 30.0, 17.0 ],
					"numoutlets" : 1,
					"id" : "obj-9",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "metro 100",
					"outlettype" : [ "bang" ],
					"fontsize" : 9.0,
					"numinlets" : 2,
					"patching_rect" : [ 107.0, 283.0, 57.57, 19.0 ],
					"numoutlets" : 1,
					"id" : "obj-12",
					"fontname" : "Osaka"
				}

			}
, 			{
				"box" : 				{
					"maxclass" : "newobj",
					"text" : "serial z 57600 8 1 0",
					"outlettype" : [ "int", "" ],
					"fontsize" : 9.0,
					"numinlets" : 1,
					"patching_rect" : [ 232.0, 193.0, 98.979996, 19.0 ],
					"numoutlets" : 2,
					"id" : "obj-13",
					"fontname" : "Osaka"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"source" : [ "obj-20", 0 ],
					"destination" : [ "obj-26", 3 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-24", 0 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-13", 0 ],
					"destination" : [ "obj-3", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-4", 0 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-17", 1 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-11", 0 ],
					"destination" : [ "obj-17", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-17", 0 ],
					"destination" : [ "obj-21", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-7", 0 ],
					"destination" : [ "obj-4", 0 ],
					"hidden" : 0,
					"midpoints" : [ 275.5, 137.0, 241.5, 137.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-9", 0 ],
					"destination" : [ "obj-4", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-15", 0 ],
					"destination" : [ "obj-14", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-14", 0 ],
					"destination" : [ "obj-5", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-5", 0 ],
					"destination" : [ "obj-16", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-1", 1 ],
					"destination" : [ "obj-10", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-2", 0 ],
					"destination" : [ "obj-1", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-16", 1 ],
					"destination" : [ "obj-2", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-1", 0 ],
					"destination" : [ "obj-10", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-3", 0 ],
					"destination" : [ "obj-18", 1 ],
					"hidden" : 0,
					"midpoints" : [ 241.5, 254.0, 423.5, 254.0 ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-23", 0 ],
					"destination" : [ "obj-19", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-3", 0 ],
					"destination" : [ "obj-19", 1 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-19", 0 ],
					"destination" : [ "obj-8", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-21", 0 ],
					"destination" : [ "obj-12", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-24", 0 ],
					"destination" : [ "obj-9", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-12", 0 ],
					"destination" : [ "obj-24", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-26", 0 ],
					"destination" : [ "obj-4", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-10", 0 ],
					"destination" : [ "obj-13", 0 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
, 			{
				"patchline" : 				{
					"source" : [ "obj-33", 0 ],
					"destination" : [ "obj-26", 2 ],
					"hidden" : 0,
					"midpoints" : [  ]
				}

			}
 ]
	}

}
