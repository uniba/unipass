#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup() {
    ofSetFrameRate(60);
    ofEnableAlphaBlending();
    ofSetVerticalSync(true);
    ofSetFullscreen(true);
    
    bReadComplete = false;
    barcodeLength = 20;
    
    franklin30.loadFont("frabk.ttf", 30);
	franklin30.setLineHeight(32.0f);
	franklin30.setLetterSpacing(1.037);
    
    franklin50.loadFont("frabk.ttf", 50);
	franklin50.setLineHeight(52.0f);
	franklin50.setLetterSpacing(1.037);
    
    fontColor = ofColor(157);
    
    colors[0] = ofColor(115, 6, 15, 255);
    colors[1] = ofColor(166, 6, 34, 255);
    colors[2] = ofColor(219, 12, 49, 255);
    colors[3] = ofColor(242, 61, 109, 255);
    colors[4] = ofColor(242, 61, 145, 255);
    colors[5] = ofColor(255, 0, 0, 255);
    colors[6] = ofColor(255, 83, 13, 255);
    colors[7] = ofColor(232, 44, 12, 255);
    colors[8] = ofColor(232, 12, 122, 255);
    colors[9] = ofColor(255, 13, 132, 255);
    
    tileSideLength = ofGetWidth() / 10;
    tileIndexX = 0;
    tileIndexY = 0;
    tileIndexMax = 20;
    tileAlpha = 0;
    alphaAmount = 5;
    
    for (int i = 0; i < tileIndexMax; ++i) {
        for (int j = 0; j < tileIndexMax; ++j) {
            ofColor col = colors[(int)ofRandom(10)];
            col.a = tileAlpha;
            tileColors.push_back(col);
            tileCoords.push_back(ofVec2f(tileSideLength * j, tileSideLength * i));
        }
    }
    
    currentTimer.setup(20, true);
    
    sender.setup("localhost", 15000);
}

//--------------------------------------------------------------
void testApp::update(){
    
}

//--------------------------------------------------------------
void testApp::draw(){
    ofBackground(255, 255, 255, 127);
    
    if (bReadComplete && tileColors.size() == tileCoords.size()) {
        for (int j = 0; j < tileIndexMax * tileIndexY; ++j) {
            ofColor col = tileColors[j];
            if (255 > col.a) { col.a += 2; }
            tileColors[j] = col;
            ofSetColor(col);
            ofFill();
            ofRect(tileCoords[j].x, tileCoords[j].y, tileSideLength, tileSideLength);
        }
    }
    
    ofSetColor(0, 0, 0, 188);
    ofRect(0, ofGetHeight() / 2 - 100, ofGetScreenWidth(), 200);
        
    ofSetColor(fontColor);
    
    if (bReadComplete) {
        franklin50.drawString("THANK YOU!!", (ofGetWidth() - THANKS_HEADER_WIDTH) / 2, ofGetHeight() / 2);
        
        franklin30.drawString(currentBarcode, (ofGetWidth() - BARCODE_NUMBER_WIDTH) / 2, ofGetHeight() / 2 + 50);
    } else {
        franklin50.drawString("TOUCH YOUR PASS!!", (ofGetWidth() - WAITING_HEADER_WIDTH) / 2, ofGetHeight() / 2);
    }
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){
    if (13 == key) {
        
        if (barcodeLength == incomingBarcode.str().length()) {
            currentBarcode = incomingBarcode.str();
            
            tileColors.clear();
            tileCoords.clear();
            tileIndexY = 0;
            
            for (int i = 0; i < tileIndexMax; ++i) {
                for (int j = 0; j < tileIndexMax; ++j) {
                    ofColor col = colors[(int)ofRandom(10)];
                    col.a = tileAlpha;
                    tileColors.push_back(col);
                    tileCoords.push_back(ofVec2f(tileSideLength * j, tileSideLength * i));
                }
            }
            
            bReadComplete = true;
            fontColor = ofColor(255);
            
            tileColors.clear();
            tileCoords.clear();
            tileIndexY = 0;
            
            ofxOscMessage msg;
            msg.setAddress("/unipass/passed");
            msg.addIntArg(1);
            sender.sendMessage(msg);
            
            ofAddListener(currentTimer.TIMER_REACHED, this, &testApp::timerReached);
            currentTimer.startTimer();
            cout << "read success : " << currentBarcode << endl;
        } else {
            bReadComplete = false;
            fontColor = ofColor(157);
            
            ofxOscMessage msg;
            msg.setAddress("/unipass/passed");
            msg.addIntArg(0);
            sender.sendMessage(msg);
            
            cout << "read failed. please retry" << endl;
        }
        
        incomingBarcode.str("");
        incomingBarcode.clear();
    } else {
        if (' ' != key) {
            bReadComplete = false;
            
            tileColors.clear();
            tileCoords.clear();
            tileIndexY = 0;
            
            char c = static_cast<char>(key);
            incomingBarcode << c;
        }
    }
    
    if (32 == key) {
        ofxOscMessage msg;
        msg.setAddress("/unipass/ready");
        sender.sendMessage(msg);
        
        bReadComplete = false;
        fontColor = ofColor(157);
        
        tileColors.clear();
        tileCoords.clear();
        tileIndexY = 0;
    }
}

//--------------------------------------------------------------
void testApp::keyReleased(int key){

}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y){

}

//--------------------------------------------------------------
void testApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void testApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void testApp::dragEvent(ofDragInfo dragInfo){ 

}

//--------------------------------------------------------------
void testApp::timerReached(ofEventArgs &e) {
    ++tileIndexY;
    if (tileIndexMax == tileIndexY) {
        // tileIndexY = 0;
        currentTimer.stopTimer();
    }
}