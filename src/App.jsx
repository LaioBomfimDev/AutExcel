import React, { useState, useEffect, useMemo } from 'react'
import { Download, Search, Filter, BarChart3, Users, Star, TrendingUp, Upload, X } from 'lucide-react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')
  const [adsFilter, setAdsFilter] = useState('all')
  const [claimFilter, setClaimFilter] = useState('all')
  const [websiteFilter, setWebsiteFilter] = useState('all')
  const [phoneFilter, setPhoneFilter] = useState('all')
  const [competitorsFilter, setCompetitorsFilter] = useState('all')
  const [reviewsFilter, setReviewsFilter] = useState('all')
  const [showUpload, setShowUpload] = useState(false)
  const [fileName, setFileName] = useState('all-task-7-overview.json')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/all-task-7-overview.json')
      if (!response.ok) {
        throw new Error('Arquivo não encontrado')
      }
      const jsonData = await response.json()
      setData(jsonData)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      alert('Erro ao carregar o arquivo JSON. Verifique se o arquivo está na pasta public.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result)
        if (Array.isArray(jsonData)) {
          setData(jsonData)
          setFileName(file.name)
          setShowUpload(false)
          alert(`Arquivo ${file.name} carregado com sucesso! ${jsonData.length} registros encontrados.`)
        } else {
          alert('O arquivo JSON deve conter um array de objetos.')
        }
      } catch (error) {
        alert('Erro ao processar o arquivo JSON. Verifique se o formato está correto.')
        console.error('Erro ao processar JSON:', error)
      }
    }
    reader.readAsText(file)
  }

  // Filtrar dados baseado nos critérios
  const filteredData = useMemo(() => {
    if (!Array.isArray(data)) return []
    return data.filter(item => {
      const matchesSearch = !searchTerm || 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(item.review_keywords) && 
         item.review_keywords.some(keyword => 
           keyword.toLowerCase().includes(searchTerm.toLowerCase())
         ))

      const matchesRating = 
        ratingFilter === 'all' ||
        (ratingFilter === 'high' && item.rating >= 4.5) ||
        (ratingFilter === 'medium' && item.rating >= 3.5 && item.rating < 4.5) ||
        (ratingFilter === 'low' && item.rating < 3.5)

      const matchesAds = 
        adsFilter === 'all' ||
        (adsFilter === 'yes' && item.is_spending_on_ads) ||
        (adsFilter === 'no' && !item.is_spending_on_ads)

      const matchesClaim = 
        claimFilter === 'all' ||
        (claimFilter === 'yes' && item.can_claim) ||
        (claimFilter === 'no' && !item.can_claim)

      const matchesWebsite = 
        websiteFilter === 'all' ||
        (websiteFilter === 'yes' && item.website && item.website.trim() !== '') ||
        (websiteFilter === 'no' && (!item.website || item.website.trim() === ''))

      const matchesPhone = 
        phoneFilter === 'all' ||
        (phoneFilter === 'yes' && item.phone && item.phone.trim() !== '') ||
        (phoneFilter === 'no' && (!item.phone || item.phone.trim() === ''))

      const matchesCompetitors = 
        competitorsFilter === 'all' ||
        (competitorsFilter === 'yes' && Array.isArray(item.competitors) && item.competitors.length > 0) ||
        (competitorsFilter === 'no' && (!Array.isArray(item.competitors) || item.competitors.length === 0))

      const matchesReviews = 
        reviewsFilter === 'all' ||
        (reviewsFilter === 'many' && item.reviews >= 50) ||
        (reviewsFilter === 'some' && item.reviews >= 10 && item.reviews < 50) ||
        (reviewsFilter === 'few' && item.reviews < 10)

      return matchesSearch && matchesRating && matchesAds && matchesClaim && matchesWebsite && matchesPhone && matchesCompetitors && matchesReviews
    })
  }, [data, searchTerm, ratingFilter, adsFilter, claimFilter, websiteFilter, phoneFilter, competitorsFilter, reviewsFilter])

  // Estatísticas do dashboard
  const stats = useMemo(() => {
    if (!Array.isArray(data)) return { totalBusinesses: 0, avgRating: '0.0', totalReviews: 0, spendingOnAds: 0, canClaim: 0, hasWebsite: 0, hasPhone: 0, filteredCount: 0 }
    const totalBusinesses = data.length
    const avgRating = data.reduce((sum, item) => sum + (item.rating || 0), 0) / totalBusinesses
    const totalReviews = data.reduce((sum, item) => sum + (item.reviews || 0), 0)
    const spendingOnAds = data.filter(item => item.is_spending_on_ads).length
    const canClaim = data.filter(item => item.can_claim).length
    const hasWebsite = data.filter(item => item.website && item.website.trim() !== '').length
    const hasPhone = data.filter(item => item.phone && item.phone.trim() !== '').length

    return {
      totalBusinesses,
      avgRating: avgRating.toFixed(1),
      totalReviews,
      spendingOnAds,
      canClaim,
      hasWebsite,
      hasPhone,
      filteredCount: filteredData.length
    }
  }, [data, filteredData])

  const exportToExcel = () => {
    try {
      if (!filteredData || filteredData.length === 0) {
        alert('Nenhum dado para exportar!')
        return
      }

      // Preparar dados para exportação
      const exportData = filteredData.map(item => ({
        'Nome': item.name || '',
        'Descrição': item.description || '',
        'Avaliações': item.reviews || 0,
        'Nota': item.rating || 0,
        'Website': item.website || '',
        'Telefone': item.phone || '',
        'Gastando em Anúncios': item.is_spending_on_ads ? 'Sim' : 'Não',
        'Pode Reivindicar': item.can_claim ? 'Sim' : 'Não',
        'Competidores': Array.isArray(item.competitors) ? item.competitors.join(', ') : '',
        'Palavras-chave': Array.isArray(item.review_keywords) ? item.review_keywords.join(', ') : ''
      }))

      // Verificar se os dados foram preparados corretamente
      if (!Array.isArray(exportData) || exportData.length === 0) {
        throw new Error('Falha ao preparar dados para exportação')
      }

      // Criar workbook
      const wb = XLSX.utils.book_new()
      const ws = XLSX.utils.json_to_sheet(exportData)

      // Definir larguras das colunas
      const colWidths = [
        { wch: 25 }, // Nome
        { wch: 40 }, // Descrição
        { wch: 12 }, // Avaliações
        { wch: 8 },  // Nota
        { wch: 30 }, // Website
        { wch: 15 }, // Telefone
        { wch: 18 }, // Gastando em Anúncios
        { wch: 15 }, // Pode Reivindicar
        { wch: 30 }, // Competidores
        { wch: 40 }  // Palavras-chave
      ]
      ws['!cols'] = colWidths

      // Estilizar cabeçalhos
      const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4472C4" } },
        alignment: { horizontal: "center", vertical: "center" },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        }
      }

      // Aplicar estilo aos cabeçalhos
      const headers = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1']
      headers.forEach(cell => {
        if (ws[cell]) {
          ws[cell].s = headerStyle
        }
      })

      // Verificar se o worksheet foi criado corretamente
      if (!ws) {
        throw new Error('Falha ao criar planilha Excel')
      }

      // Estilizar dados
      for (let row = 2; row <= exportData.length + 1; row++) {
        const isEvenRow = row % 2 === 0
        const rowStyle = {
          fill: { fgColor: { rgb: isEvenRow ? "F2F2F2" : "FFFFFF" } },
          border: {
            top: { style: "thin", color: { rgb: "CCCCCC" } },
            bottom: { style: "thin", color: { rgb: "CCCCCC" } },
            left: { style: "thin", color: { rgb: "CCCCCC" } },
            right: { style: "thin", color: { rgb: "CCCCCC" } }
          },
          alignment: { wrapText: true, vertical: "top" }
        }

        // Aplicar estilo a todas as colunas da linha
        const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        if (Array.isArray(columns)) {
          columns.forEach(col => {
            const cellRef = col + row
            if (ws[cellRef]) {
              ws[cellRef].s = { ...rowStyle }
              
              // Estilo específico para colunas numéricas
              if (col === 'C' || col === 'D') { // Avaliações e Nota
                ws[cellRef].s.alignment = { ...ws[cellRef].s.alignment, horizontal: "center" }
              }
              
              // Cores para Sim/Não
              if ((col === 'G' || col === 'H') && ws[cellRef].v) { // Anúncios e Reivindicar
                if (ws[cellRef].v === 'Sim') {
                  ws[cellRef].s.font = { color: { rgb: "008000" }, bold: true }
                } else if (ws[cellRef].v === 'Não') {
                  ws[cellRef].s.font = { color: { rgb: "FF0000" } }
                }
              }
            }
          })
        }
      }

      // Definir altura das linhas
      ws['!rows'] = [{ hpt: 25 }] // Cabeçalho mais alto

      XLSX.utils.book_append_sheet(wb, ws, 'Empresas')

      // Gerar nome do arquivo com timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
      const filename = `empresas-filtradas-${timestamp}.xlsx`

      // Salvar arquivo
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([wbout], { type: 'application/octet-stream' })
      saveAs(blob, filename)

      alert(`Arquivo Excel exportado com sucesso!\n${filteredData.length} registros exportados para: ${filename}`)
    } catch (error) {
      console.error('Erro na exportação Excel:', error)
      alert(`Erro ao exportar arquivo Excel: ${error.message}`)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Carregando dados...</div>
      </div>
    )
  }

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <BarChart3 size={32} className="header-icon" />
            <div>
              <h1>Dashboard de Empresas</h1>
              <p>Análise e exportação de dados empresariais</p>
            </div>
          </div>
          <button 
            onClick={() => setShowUpload(true)} 
            className="upload-btn"
          >
            <Upload size={20} />
            Carregar JSON
          </button>
        </div>
      </header>

      {/* Modal de Upload */}
      {showUpload && (
        <div className="upload-modal">
          <div className="upload-content">
            <div className="upload-header">
              <h3>Carregar novo arquivo JSON</h3>
              <button onClick={() => setShowUpload(false)} className="close-btn">
                <X size={20} />
              </button>
            </div>
            <div className="upload-body">
              <p>Selecione um arquivo JSON com dados de empresas:</p>
              <input 
                type="file" 
                accept=".json" 
                onChange={handleFileUpload}
                className="file-input"
              />
            </div>
          </div>
        </div>
      )}

      {/* Dashboard de Estatísticas */}
      <div className="dashboard">
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalBusinesses}</h3>
            <p>Total de Empresas</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.avgRating}</h3>
            <p>Avaliação Média</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalReviews.toLocaleString()}</h3>
            <p>Total de Avaliações</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Filter size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.filteredCount}</h3>
            <p>Resultados Filtrados</p>
          </div>
        </div>
      </div>

      {/* Controles de Filtro */}
      <div className="controls">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por nome, descrição ou palavras-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-dropdown">
          <button className="filter-btn">
            <Filter size={20} />
            Filtros
          </button>
          <div className="filter-menu">
            <div className="filter-group">
              <label>Avaliação:</label>
              <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="high">Alta (4.5+)</option>
                <option value="medium">Média (3.5-4.4)</option>
                <option value="low">Baixa (&lt;3.5)</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Anúncios:</label>
              <select value={adsFilter} onChange={(e) => setAdsFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="yes">Gastando</option>
                <option value="no">Não Gastando</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Reivindicação:</label>
              <select value={claimFilter} onChange={(e) => setClaimFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="yes">Pode Reivindicar</option>
                <option value="no">Não Pode Reivindicar</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Website:</label>
              <select value={websiteFilter} onChange={(e) => setWebsiteFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="yes">Com Website</option>
                <option value="no">Sem Website</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Telefone:</label>
              <select value={phoneFilter} onChange={(e) => setPhoneFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="yes">Com Telefone</option>
                <option value="no">Sem Telefone</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Competidores:</label>
              <select value={competitorsFilter} onChange={(e) => setCompetitorsFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="yes">Com Competidores</option>
                <option value="no">Sem Competidores</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Avaliações:</label>
              <select value={reviewsFilter} onChange={(e) => setReviewsFilter(e.target.value)}>
                <option value="all">Todas</option>
                <option value="many">Muitas (50+)</option>
                <option value="some">Algumas (10-49)</option>
                <option value="few">Poucas (&lt;10)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="controls-right">
          <span className="file-info">{fileName}</span>
          <button onClick={exportToExcel} className="export-btn">
            <Download size={20} />
            Exportar Excel
          </button>
        </div>
      </div>

      {/* Tabela de Dados */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Avaliações</th>
              <th>Nota</th>
              <th>Website</th>
              <th>Telefone</th>
              <th>Anúncios</th>
              <th>Reivindicar</th>
              <th>Competidores</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  Nenhum resultado encontrado com os filtros aplicados.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="name-cell"><strong>{item.name || 'N/A'}</strong></td>
                  <td className="description-cell">
                    {item.description ? 
                      (item.description.length > 100 ? 
                        item.description.substring(0, 100) + '...' : 
                        item.description
                      ) : 'N/A'
                    }
                  </td>
                  <td className="number-cell">{item.reviews || 0}</td>
                  <td className={`rating-cell rating-${item.rating >= 4.5 ? 'high' : item.rating >= 3.5 ? 'medium' : 'low'}`}>
                    <span className={`rating ${item.rating >= 4.5 ? 'high' : item.rating >= 3.5 ? 'medium' : 'low'}`}>
                      {item.rating ? item.rating.toFixed(1) : 'N/A'}
                    </span>
                  </td>
                  <td className={`website-cell ${item.website ? 'status-yes' : 'status-no'}`}>
                    {item.website ? (
                      <a href={item.website.startsWith('http') ? item.website : `https://${item.website}`} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="website-link">
                        Website
                      </a>
                    ) : (
                      <span className="no-website">Sem website</span>
                    )}
                  </td>
                  <td className={`phone-cell ${item.phone ? 'status-yes' : 'status-no'}`}>
                     {item.phone ? (
                       <span className="has-phone">{item.phone}</span>
                     ) : (
                       <span className="no-phone">Sem telefone</span>
                     )}
                   </td>
                   <td className={`ads-cell ${item.is_spending_on_ads ? 'status-yes' : 'status-no'}`}>
                     <span className={`status ${item.is_spending_on_ads ? 'yes' : 'no'}`}>
                       {item.is_spending_on_ads ? 'Gastando' : 'Não gastando'}
                     </span>
                   </td>
                   <td className={`claim-cell ${item.can_claim ? 'status-yes' : 'status-no'}`}>
                     <span className={`status ${item.can_claim ? 'yes' : 'no'}`}>
                       {item.can_claim ? 'Pode reivindicar' : 'Não pode'}
                     </span>
                   </td>
                  <td className="competitors-cell">
                    {Array.isArray(item.competitors) && item.competitors.length > 0 ? (
                      <span className="has-competitors">
                        {item.competitors.length} competidor(es)
                      </span>
                    ) : (
                      <span className="no-competitors">Sem competidores</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App