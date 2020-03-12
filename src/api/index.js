import ajax from '../utils/ajax'

// 加载待处理主审任务列表
export function loadPrincipalAuditTaskData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadPrincipalAuditTaskData', data)
}

// 加载任务内容
export function loadAuditTaskDetail(data) {
  return ajax.post('/business/auditFirm/auditTask/loadAuditTaskDetail', data)
}

// 执行任务启动
export function startAuditTask(data) {
  return ajax.post('/business/auditFirm/auditTask/startAuditTask', data)
}

// 加载流程标准数据
export function loadProcessStandardData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadProcessStandardData', data)
}

// 保存选择审核流程
export function saveAuditProcess(data) {
  return ajax.post('/business/auditFirm/auditTask/saveAuditProcess', data)
}

// 获取已选择的流程选项数据
export function loadSelectedProcessData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadSelectedProcessData', data)
}

// 获取下属企业列表数据
export function loadCompanyData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadCompanyData', data)
}

// 保存选择审核企业
export function saveSelectCompanys(data) {
  return ajax.post('/business/auditFirm/auditTask/saveSelectCompanys', data)
}

// 获取进行审核的企业列表数据
export function loadAuditCompanyData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadAuditCompanyData', data)
}

// 获取企业关联事务所选项数据
export function loadRelativeAuditFirmOptions(data) {
  return ajax.post('/business/auditFirm/auditTask/loadRelativeAuditFirmOptions', data)
}

// 保存事务所任务
export function saveAuditFirmTask(data) {
  return ajax.post('/business/auditFirm/auditTask/saveAuditFirmTask', data)
}

// 加载任务进度列表数据
export function loadAuditTaskProgressData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadAuditTaskProgressData', data)
}

// 查看缺陷汇总列表数据
export function loadDefectData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadDefectData', data)
}

// 查看风险预警汇总
export function loadRiskWarningData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadRiskWarningData', data)
}

// 查看问题整改确认汇总
export function loadDefectRectificationData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadDefectRectificationData', data)
}

// 加载成熟度标准列表数据
export function loadMaturityStandardData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadMaturityStandardData', data)
}

// 保存成熟度评级数据
export function saveMaturityItemData(data) {
  return ajax.post('/business/auditFirm/auditTask/saveMaturityItemData', data)
}

// 保存成熟度整体评价数据
export function saveMaturityData(data) {
  return ajax.post('/business/auditFirm/auditTask/saveMaturityData', data)
}

// 加载成熟度数据
export function loadMaturityData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadMaturityData', data)
}

// 提交主审任务
export function submitPrincipalAuditTask(data) {
  return ajax.post('/business/auditFirm/auditTask/submitPrincipalAuditTask', data)
}

// 加载待处理参审任务列表数据
export function loadParticipativeAuditTaskData(data) {
  return ajax.post('/business/auditFirm/auditTask/loadParticipativeAuditTaskData', data)
}

// 加载审核流程选项数据
export function loadAuditProcessOptionData(data) {
  return ajax.post('/business/auditFirm/auditTaskData/loadAuditProcessOptionData', data)
}

// 加载风险原则列表数据
export function loadRiskData(data) {
  return ajax.post('/business/auditFirm/auditTaskData/loadRiskData', data)
}

// 加载流程有效性测试项数据
export function loadProcessValidityTestItemData(data) {
  return ajax.post('/business/auditFirm/auditTaskData/loadProcessValidityTestItemData', data)
}

// 保存流程有效性测试结果数据
export function saveDefectData(data) {
  return ajax.post('/business/auditFirm/auditTaskData/saveDefectData', data)
}

// 加载风险指标测试项数据
export function loadProcessRiskIndicationTestItemData(data) {
  return ajax.post('/business/auditFirm/auditTaskData/loadProcessRiskIndicationTestItemData', data)
}

// 保存风险指标数据
export function saveRiskWarningData(data) {
  return ajax.post('/business/auditFirm/auditTaskData/saveRiskWarningData', data)
}

// 上期问题整改测试项数据
export function loadDefectRectificationTestItemData(data) {
  return ajax.post('/business/auditFirm/auditTaskData/loadDefectRectificationTestItemData', data)
}

// 保存缺陷问题整改确认数据
export function saveDefectRectificationConfirmation(data) {
  return ajax.post('/business/auditFirm/auditTaskData/saveDefectRectificationConfirmation', data)
}

// 上传事务所评测报告文件
export function uploadAuditTaskAttachment(data) {
  return ajax.post('/business/auditFirm/auditTaskData/uploadAuditTaskAttachment', data)
}

// 提交参审任务
export function submitParticipativeAuditTask(data) {
  return ajax.post('/business/auditFirm/auditTask/submitParticipativeAuditTask', data)
}