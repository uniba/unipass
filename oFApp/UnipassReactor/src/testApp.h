#pragma once

#include "ofMain.h"
#include "ofxTimer.h"
#include "ofxOsc.h"

#define BARCODE_NUMBER_WIDTH 420
#define WAITING_HEADER_WIDTH 630
#define THANKS_HEADER_WIDTH  400

class testApp : public ofBaseApp{
	public:
		void setup();
		void update();
		void draw();
		
		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y);
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
        
        bool bReadComplete;
        int barcodeLength;
        stringstream incomingBarcode;
        string currentBarcode;
        
        ofTrueTypeFont franklin30;
        ofTrueTypeFont franklin50;
        ofColor fontColor;
        
        ofColor colors[10];
        int tileSideLength;
        int tileIndexX, tileIndexY, tileIndexMax;
        int tileAlpha;
        int alphaAmount;
        vector<ofColor> tileColors;
        vector<ofVec2f> tileCoords;
        
        ofxTimer currentTimer;
        void timerReached(ofEventArgs &e);
        
        ofxOscSender sender;
};
