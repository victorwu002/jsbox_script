const ruleUpdateUtil = require('scripts/ruleUpdateUtil')

const sw = $device.info.screen.width

function renderTodayUI() {
    ruleUpdateUtil.getGitHubFilesSha({
        handler: sha => {
            let canUpdate = ruleUpdateUtil.checkUpdate(ruleUpdateUtil.getFilesSha(), sha)
            $("updateStatus").text = ""
            $("newTag").hidden = !canUpdate
        }
    })
    $ui.render({
        props: {
            id: "todayMainView",
            title: "Surge3规则生成",
            frame: $rect(0, 0, sw, 110),
            hideNavbar: true,
            navBarHidden: true
            // bgcolor: $rgba(255, 255, 255, 0)
        },
        views: [{
            type: "view",
            props: {
                id: "",
                // borderColor: $rgba(50, 50, 50, 0.1),
                // borderWidth: 2,
                // radius: 10
            },
            layout: (make, view) => {
                make.height.equalTo(110)
                make.width.equalTo(view.super).offset(0)
                make.center.equalTo(view.super)
            },
            views: [{
                type: "label",
                props: {
                    id: "updateStatus",
                    text: "Rules-lhie1 by Fndroid",
                    font: $font(12),
                    textColor: $rgba(50, 50, 50, .3)
                },
                layout: (make, view) => {
                    make.top.equalTo(view.super.top).offset(5)
                    make.centerX.equalTo(view.super)
                }
            }, {
                type: "label",
                props: {
                    id: "updateStatus",
                    text: "检查规则更新...",
                    font: $font(12),
                    textColor: $rgba(50, 50, 50, .3)
                },
                layout: (make, view) => {
                    make.bottom.equalTo(view.super.bottom).offset(-5)
                    make.centerX.equalTo(view.super)
                }
            }, {
                type: "image",
                props: {
                    id: "pullBtn",
                    data: $file.read("assets/today_pull.png"),
                    radius: 25,
                    bgcolor: $rgba(255, 255, 255, 0)
                },
                layout: (make, view) => {
                    make.width.height.equalTo(55)
                    make.centerY.equalTo(view.super).offset(-10)
                    make.centerX.equalTo(view.super)
                },
                events: {
                    tapped: sender => {
                        $app.openURL("jsbox://run?name=Rules-lhie1&auto=1")
                    }
                },
            }, {
                type: "image",
                props: {
                    id: "surgeBtn",
                    data: $file.read("assets/today_surge.png"),
                    radius: 25,
                    bgcolor: $rgba(255, 255, 255, 0)
                },
                layout: (make, view) => {
                    make.width.height.equalTo(55)
                    make.centerY.equalTo(view.super).offset(-10)
                    make.right.equalTo(view.prev.left).offset(- (sw / 9))
                },
                events: {
                    tapped: sender => {
                        $app.openURL("surge3:///toggle?autoclose=true")
                    }
                }
            }, {
                type: "image",
                props: {
                    id: "jsboxBtn",
                    data: $file.read("assets/today_jsbox.png"),
                    radius: 25,
                    bgcolor: $rgba(255, 255, 255, 0)
                },
                layout: (make, view) => {
                    make.width.height.equalTo(50)
                    make.centerY.equalTo(view.super).offset(-10)
                    make.left.equalTo(view.prev.prev.right).offset((sw / 9))
                },
                events: {
                    tapped: sender => {
                        $app.openURL("jsbox://run?name=Rules-lhie1")
                    }
                }
            }, {
                type: "label",
                props: {
                    text: "更新规则",
                    font: $font(12),
                    textColor: $rgba(50, 50, 50, .8),
                    align: $align.center
                },
                layout: (make, view) => {
                    make.height.equalTo(10)
                    make.top.equalTo($("pullBtn").bottom)
                    make.width.equalTo($("pullBtn").width)
                    make.centerX.equalTo($("pullBtn"))
                }
            }, {
                type: "label",
                props: {
                    text: "Surge开关",
                    font: $font(12),
                    textColor: $rgba(50, 50, 50, .8),
                    align: $align.center
                },
                layout: (make, view) => {
                    make.height.equalTo(10)
                    make.top.equalTo(view.prev.top)
                    make.width.equalTo($("pullBtn").width)
                    make.centerX.equalTo($("surgeBtn"))
                }
            }, {
                type: "label",
                props: {
                    text: "脚本设置",
                    font: $font(12),
                    textColor: $rgba(50, 50, 50, .8),
                    align: $align.center
                },
                layout: (make, view) => {
                    make.height.equalTo(10)
                    make.top.equalTo($("pullBtn").bottom)
                    make.width.equalTo($("pullBtn").width)
                    make.centerX.equalTo($("jsboxBtn"))
                }
            }, {
                type: "image",
                props: {
                    id: "newTag",
                    data: $file.read("assets/new_rules_tag.png"),
                    bgcolor: $rgba(255, 255, 255, 0),
                    hidden: true
                },
                layout: (make, view) => {
                    make.width.height.equalTo(15)
                    make.centerY.equalTo(view.super).offset(-20)
                    make.left.equalTo($("pullBtn").right).offset(-15)
                }
            }]
        }]
    })
}

module.exports = {
    renderTodayUI: renderTodayUI
}