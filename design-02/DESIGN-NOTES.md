# 設計提案 02

方向由使用者指定 OUTFRONT，因此不進行隨機方向抽選。品牌綠、斜切照片遮罩、疊字與淺深分區；原生捲動，無固定長舞台。文案依 proposal/index.html 的一個窗口、媒體分類、四階段服務流程展開，不刊登未核實人流、代理權、合作客戶與承諾回覆時效。案例改為明確標示的場域示意，未虛構案例。

頁面論點：人在路上的實體觸點（雙層巴士主視覺）→ 跨媒體一個窗口（介紹）→ 各場域有不同受眾與形式（六項切換）→ 空間尺度（實景圖）→ 依地區規劃（地區帶入）→ 執行流程（四步驟）→ 整理需求（可複製摘要）。

既有素材清單：松竹綠、台北街頭、台北車站大廳、捷運站體壁貼、公車車身、雙層巴士、航廈手推車、映前銀幕。圖像裝置取自移動場域：車窗般的斜切邊界，將影像與版面連結。互動核心為媒體選擇與詢價需求摘要。

照片：hero-concept.jpg 為內建 image_gen 以既有 decker.jpg 優化。其餘六張亦為內建 image_gen 的生成優化版本，完整提示詞見 assets/IMAGE-PROMPTS.md。來源原檔保留在 ../assets/，公開頁面已標示 AI 優化與版位示意。細節、小字、人物可能有生成差異。

主視覺提示詞：Edit target: the provided photograph of a red double-decker sightseeing bus outside Taipei Main Station. Create a premium editorial hero photo for Songzhu Media's outdoor advertising website, landscape 3:2. Preserve the identifiable red bus, its proportions, Taiwan streetscape and the station-side scene. Improve photographic quality, remove washed-out haze, refine exposure and crisp realistic details, rich restrained red, cool green-gray shadows, natural warm afternoon sunlight, polished architectural editorial photography. Keep the bus as the dominant subject in the central-right composition with the surrounding city visible; straighten distracting perspective mildly. Do not invent ads, logos, slogans, extra vehicles, landmarks or people. Preserve existing text where possible rather than inventing words. No graphic shapes, no overlay, no added typography: the web page will implement masks in CSS. This is a concept-treated photo, not documentary evidence.

ROUND 1
Seen in one second: 紅色雙層巴士與中文主標。
Idea (one sentence): 台北移動場域成為斜切視窗與疊層文字的舞台。
Live thing: 六種媒體切換、地區帶入、複製需求摘要。
Layout words by section: hero=mask / intro=split / media=selector / spaces=asymmetric / network=diagonal / process=sequence / contact=form
Scores: design 7.5 · usability 8 · creativity 7 · content 7.5 → overall 7.6
Caps applied: 明確參考既有品牌構圖，創意不高於 7。
Top three problems:
1. desktop-fold: 綠色英文疊字在深色照片上不易辨識，改用 difference 疊色。
2. tablet-fold: 手機選單按鈕在桌機重複出現，限手機顯示。
3. mobile: 320px 頁首較窄，縮小字標並省略圖形標記。

檢查器備註：eyebrow 偵測把 aria-hidden 英文裝飾文字當標題，把首屏主要 CTA 當上方小標；使用 --allow eyebrow 記錄此誤判。沒有影片是基於使用者特別要求手機流暢、以照片遮罩替代大量影音；保留短 transform/opacity 入場與操作回饋。logo 英文維持小型識別字。依響應式與中英文字體光學比例使用不同尺寸，非單純五級量表。

功能驗證：320/390/768/1440 無橫向溢位；六個媒體切換、圖片載入、地區帶入、摘要內容及過期摘要清除、手機選單與 Escape、reduced-motion 已檢查。獨立 reviewer 提出的摘要過期與無 JS 意外 GET 提交均修正。

ROUND 2
Seen in one second: 中文品牌主張、紅色巴士與清楚的影像斜切窗。
Idea (one sentence): 城市移動場景成為主視覺的版面邊界。
Live thing: 六場域切換與本機需求摘要。
Layout words by section: hero=mask / intro=split / media=selector / spaces=asymmetric / network=diagonal / process=sequence / contact=form
Scores: design 7.5 · usability 8 · creativity 7 · content 7.5 → overall 7.6
Caps applied: 參考既有設計語言，創意上限 7。
Top three problems:
1. 影像中的生成小字存在失真，已標示 AI 優化與設計用途，正式案例需重新審核。
2. 差值混色會在影像上呈現反相色；此為使用者指定遮罩與視覺效果的裝飾疊字，主標題維持實色可讀。
3. 完整路網與正式詢價端點尚未在本次提案範圍，頁面以功能說明與可複製摘要呈現。

最終 inspector：0 FAIL，5 項風格 WARN（混合中英字體、尺寸階層、無影片、裝飾文字混色、小型品牌英文），均有上述設計理由。無 JavaScript 驗證：內容與導覽可見、摘要按鈕停用。git diff --cached --check 通過。
