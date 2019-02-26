<template>
    <div>
        <table id="splash" width="100%" height="100%"
            style="background:white;position:absolute;top:0px;left:0px;z-index:4;">
            <tr>
                <td align="center" valign="middle">
                    <img src="../../../asset/image/graph/loading.gif">
                </td>
            </tr>
        </table>
        <div id="graph" class="base">
            <!-- Graph Here -->
        </div>
    </div>
</template>

<script>
import Api from '../../common/service-api';
import Def from '../../common/commondef';
import {
    mxGraph,
    mxObjectCodec,
    mxEvent,
    mxEffects,
    mxClient,
    mxUtils,
    mxEditor,
    mxConstants,
    mxGraphHandler,
    mxGuide,
    mxEdgeHandler,
} from 'mxgraph';
var mxBasePath = '../../../asset/graph/src';
export default {
    name:'editAbilityMap',
    components:{

    },
    data(){
        return {

        }
    },
    mounted(){
        this.initGraph();
        this.createEditor("../../../asset/conf/graph/workfloweditor.xml");
    },
    methods:{
        initGraph(){
            console.log(mxBasePath);
            console.log(mxClient.basePath);
            console.log(mxUtils);
            mxGraph.htmlLabels = true;
            mxGraph.isWrapping = function(cell)
            {
                return true;
            };
            mxConstants.DEFAULT_HOTSPOT = 1;
            // Enables guides
            mxGraphHandler.guidesEnabled = true;
            // Alt disables guides
            mxGuide.isEnabledForEvent = function(evt)
            {
                return !mxEvent.isAltDown(evt);
            };
            // Enables snapping waypoints to terminals
            mxEdgeHandler.snapToTerminals = true;
        },
        createEditor(config){
            var editor = null;
            var hideSplash = function()
            {
                // Fades-out the splash screen
                var splash = document.getElementById('splash');
                
                if (splash != null)
                {
                    try
                    {
                        mxEvent.release(splash);
                        mxEffects.fadeOut(splash, 100, true);
                    }
                    catch (e)
                    {
                        splash.parentNode.removeChild(splash);
                    }
                }
            };
            
            try
            {
                if (!mxClient.isBrowserSupported())
                {
                    mxUtils.error('Browser is not supported!', 200, false);
                }
                else
                {
                    mxObjectCodec.allowEval = true;
                    var node = mxUtils.load(config).getDocumentElement();
                    console.log(node);
                    editor = new mxEditor(node);
                    mxObjectCodec.allowEval = false;
                    
                    // Adds active border for panning inside the container
                    editor.graph.createPanningManager = function()
                    {
                        var pm = new mxPanningManager(this);
                        pm.border = 30;
                        
                        return pm;
                    };
                    
                    editor.graph.allowAutoPanning = true;
                    editor.graph.timerAutoScroll = true;
                    
                    // Updates the window title after opening new files
                    var title = document.title;
                    var funct = function(sender)
                    {
                        document.title = title + ' - ' + sender.getTitle();
                    };
                    
                    editor.addListener(mxEvent.OPEN, funct);
                    
                    // Prints the current root in the window title if the
                    // current root of the graph changes (drilling).
                    editor.addListener(mxEvent.ROOT, funct);
                    funct(editor);
                    
                    // Displays version in statusbar
                    editor.setStatus('mxGraph '+mxClient.VERSION);

                    // Shows the application
                    hideSplash();
                }
            }
            catch (e)
            {
                hideSplash();

                // Shows an error message if the editor cannot start
                mxUtils.alert('Cannot start application: ' + e.message);
                throw e; // for debugging
            }

            return editor;
        }
    }
}
</script>

<style>

</style>
